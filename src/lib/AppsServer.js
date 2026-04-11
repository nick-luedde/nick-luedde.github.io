// quick polyfill for Google Apps Script Session object
const Session = {
  getActiveUser() {
    return {
      getEmail() { return 'me@test.com' }
    }
  }
};

export default class AppsServer {
  /**
   * App server definition
   * Requests made successfully through a server object will always return a json response with a body prop
   *   - The body of the response will be either json type, or html type content
   * Requests that error will return a json response with an error prop
   *   - The error of the response will be an object with at minimum a message, but may also have a cause property
   * @param {AppsServerOptions} options
   */
  static create(options = {}) {
    //TODO: default options
    const debug = options.debug || false;
    const STATUS_CODE = {
      SUCCESS: 200,
      CREATED: 201,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      SERVER_ERROR: 500
    };
    const MIME_TYPES = {
      JSON: 'application/json',
      HTML: 'text/html',
      CSV: 'text/csv',
      JS: 'js/object',
      RAW: 'data/raw'
    };
    const parseRouteWithParams = (route) => {
      const params = {};
      const [routestr, paramstr] = route.split('?');
      if (!paramstr)
        return {
          route: routestr,
          params
        };
      const elements = paramstr.split('&');
      elements.forEach(el => {
        const [prop, val] = el.split('=');
        params[decodeURIComponent(prop)] = decodeURIComponent(val);
      });
      return {
        route: routestr,
        params
      };
    };
    /**
     * Attempts to find and tokenize a matching route with named parames (ie. /home/user/:id)
     * @param {AppsRequest} req - request obj
     * @param {AppsRoutes} method - route method
     */
    const findTokenRoute = (req, method) => {
      const tokenRoutes = Object.keys(method).filter(key => key.includes(':'));
      for (const route of tokenRoutes) {
        const tk = tokenizeRoute(route);
        if (tk.isMatch(req.route)) {
          req.params = {
            ...req.params,
            ...tk.paramsFromTokens(req.route)
          };
          return method[route];
        }
      }
    };
    /**
     * Tokenizes a registered route so that it can be used to match a requested route
     * @param {string} route - registered route to tokenize for matching
     */
    const tokenizeRoute = (route) => {
      // if theres a part that starts with ':' it means its a route param,
      // so that means we have to pick that part out of the actual route and get that as a param somehow...
      // So the regex could become => :param replace with [^/]* then matching...
      // and the param could remember where it came from (before and after uri, then match within...)
      const keys = [];
      const regexStr = route.replace(/:([^/]+)/g, (_, key) => {
        keys.push(key.replace(':', ''));
        // replace ':param' with capture group
        return '([^/]+)';
      });
      const routeRegex = new RegExp(`^${regexStr}$`);
      const isMatch = (sent) => routeRegex.test(sent);
      // and when we get a route, we can match the values
      const paramsFromTokens = (sent) => {
        const params = {};
        const match = sent.match(routeRegex);
        if (match) {
          keys.forEach((key, i) => {
            // match[1] is the first capture group, match[2] the second, etc.
            params[key] = decodeURIComponent(match[i + 1]);
          });
        }
        return params;
      };
      return { isMatch, paramsFromTokens };
    };
    const matchRoute = (pattern, route) => new RegExp(pattern).test(route);
    const middleware = [];
    const use = (route, fn) => {
      const matcher = typeof route === 'function'
        ? () => true
        : (requested) => matchRoute(route, requested);
      const mw = (req, res, next) => matcher(req.route)
        ? fn(req, res, next)
        : next();
      middleware.push(mw);
    };
    const errors = [];
    const error = (fn) => errors.push(fn);
    const gets = {};
    const get = (route, ...fns) => {
      gets[route] = fns;
    };
    const posts = {};
    const post = (route, ...fns) => {
      posts[route] = fns;
    };
    const deletes = {};
    const del = (route, ...fns) => {
      deletes[route] = fns;
    };
    const methods = {
      get: gets,
      post: posts,
      delete: deletes
    };
    /**
     * Print routes
     */
    const inspect = () => {
      let details = 'AppsServer inspect:\n\n';
      details += 'GET ROUTES\n';
      details += '---------------------\n';
      details += Object.keys(gets).join('\n');
      details += '\n---------------------\n\n';
      details += 'POST ROUTES\n';
      details += '---------------------\n';
      details += Object.keys(posts).join('\n');
      details += '\n---------------------\n\n';
      details += 'DELETE ROUTES\n';
      details += '---------------------\n';
      details += Object.keys(deletes).join('\n');
      details += '\n---------------------\n\n';
      console.log(details);
      return details;
    };
    /**
     * Create new response obj
     */
    const response = () => {
      const res = {
        status: 999,
        headers: {},
        type: MIME_TYPES.JSON,
        body: null,
        toType: () => {
          if (res.type === MIME_TYPES.JSON)
            return JSON.stringify(res);
          if (res.type === MIME_TYPES.RAW)
            return res.body;
          return res;
        }
      };
      const isSuccess = () => res.status >= 200 && res.status < 300;
      const send = (body) => {
        res.body = body;
        return res;
      };
      const render = ({ html, file }, props) => {
        const template = html
          ? HtmlService.createTemplate(html)
          : file
            ? HtmlService.createTemplateFromFile(file)
            : HtmlService.createTemplate('');
        template.props = props;
        const output = template.evaluate();
        res.status = STATUS_CODE.SUCCESS;
        res.type = MIME_TYPES.HTML;
        res.body = output;
        return res;
      };
      const type = (ty) => {
        res.type = ty;
        return api;
      };
      const status = (code) => {
        res.status = code;
        return api;
      };
      const headers = (hdrs) => {
        res.headers = {
          ...res.headers,
          ...hdrs
        };
        return api;
      };
      const api = {
        locals: {},
        isSuccess,
        send,
        render,
        status,
        headers,
        type,
        res
      };
      return api;
    };
    /**
     * Middleware stack composer
     */
    const mwstack = (req, res, handlers) => {
      let index = 0;
      const all = [
        ...middleware,
        ...handlers
      ];
      const nxt = (i) => {
        if (i <= index && index !== 0)
          throw new ApiError('next() called multiple times in a row', { code: STATUS_CODE.SERVER_ERROR });
        index = i;
        let mw = all[index];
        if (!mw) {
          // If we have made it to the last element of the stack (which will be the route handler, it is undefined, return NOT_FOUND_RESPONSE)
          if (index === all.length)
            return res.status(STATUS_CODE.NOT_FOUND).send({ message: `${req.route} not a valid route!` });
          else
            throw new Error(`Something went wrong in the mw stack for index ${index}`);
        }
        return mw(req, res, nxt.bind(null, index + 1));
      };
      return nxt(0);
    };
    /**
     * Eats error if cannot get active user
     */
    const quietGetUserEmail = () => {
      try {
        return Session.getActiveUser().getEmail();
      }
      catch {
        return '';
      }
    };
    /**
     * Handles a request from the client
     */
    const request = (req) => {
      try {
        req.by = quietGetUserEmail();
        req.auth = {};
        req.params = req.params || {};
        req.rawRoute = req.route;
        const parsed = parseRouteWithParams(req.route);
        req.route = parsed.route;
        req.params = {
          ...req.params,
          ...parsed.params
        };
        const res = response();
        const method = methods[String(req.method).toLowerCase()] || {};
        let handler = method[req.route];
        if (!handler)
          handler = findTokenRoute(req, method) || [];
        debug && console.time('mwstack');
        mwstack(req, res, handler);
        debug && console.timeEnd('mwstack');
        return res.res;
      }
      catch (err) {
        const error = err;
        const res = response();
        console.error(error);
        if (error.stack)
          console.error(error.stack);
        res.status(error.code || STATUS_CODE.SERVER_ERROR)
          .send({
            name: error.name,
            message: error.code ? error.message : 'Something went wrong!',
            stack: debug ? error.stack : undefined
          });
        errors.forEach(handler => {
          try {
            handler(error, req);
          }
          catch (inner) {
            const handlerError = inner;
            console.error(handlerError);
            if (handlerError.stack)
              console.error(handlerError.stack);
          }
        });
        if (debug) {
          console.log('error-request', req);
          console.log('error-response', res);
        }
        return res.res;
      }
    };
    /**
     * Helper to handle client requests, call this from the top level "api" function in your app
     * @param {AppsRequest} req - request
     */
    const handleClientRequest = (req) => {
      const parsed = !req
        ? {}
        : typeof req === 'string'
          ? JSON.parse(req)
          : req;
      //ignore any additional props of the request so we know the request is clean when it comes in
      const { method, headers, route, params, body } = parsed;
      return request({
        method: method || 'get',
        headers,
        route: route || '',
        params,
        body
      }).toType();
    };
    /**
     * Helper to handle doGet request (just call this with your server obj in your doGet fn)
     */
    const handleDoGet = (event = {}, { homeroute = '/' } = {}) => {
      const pathInfo = event.pathInfo === undefined ? '' : event.pathInfo;
      const path = String(pathInfo).toLowerCase();
      if (path.startsWith('api/')) {
        const response = handleClientRequest({
          method: 'get',
          route: path.slice(3),
          params: event.parameter
        });
        return ContentService
          .createTextOutput(String(response))
          .setMimeType(ContentService.MimeType.JSON);
      }
      const content = request({
        method: 'get',
        route: path !== '' ? `/${path}` : homeroute,
        params: event.parameter
      });
      return content.body;
    };
    /**
     * Helper to handle doPost request (just call this with your server obj in your doPost fn)
     */
    const handleDoPost = (event = {}) => {
      const pathInfo = event.pathInfo === undefined ? '' : event.pathInfo;
      const fullPath = String(pathInfo).toLowerCase();
      const path = fullPath.startsWith('api/')
        ? fullPath.slice(3)
        : `/${fullPath}`;
      const { method, type = 'application/json' } = event.parameter;
      const body = type === 'application/json'
        ? JSON.parse(event.postData.contents)
        : event.postData.contents;
      const response = handleClientRequest({
        method: (method || 'post'),
        route: path,
        body,
        params: event.parameter
      });
      return ContentService
        .createTextOutput(String(response))
        .setMimeType(ContentService.MimeType.JSON);
    };
    return {
      STATUS_CODE,
      MIME_TYPES,
      inspect,
      use,
      error,
      get,
      post,
      delete: del,
      request,
      handleClientRequest,
      handleDoGet,
      handleDoPost
    };
  }
}
class ApiError extends Error {
  constructor(message, { code = 400 } = {}) {
    super(message);
    this.code = code;
  }
}
