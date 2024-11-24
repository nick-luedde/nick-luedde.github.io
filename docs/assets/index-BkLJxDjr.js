(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const attach = (node) => (el) => {
  const to = typeof el === "string" ? document.querySelector(`#${el}`) : el;
  to == null ? void 0 : to.appendChild(node);
  return to;
};
const Bio = () => {
  const template = `

    <div id="pic" class="mt-6 flex flex-col-reverse md:flex-row items-center transition-opacity duration-1000 opacity-0">
      
      <p class="mt-2 md:m-0">
        Hey, I'm Nick, and I'm a developer working with JavaScript, TypeScript, HTML, CSS, SQL, and some C# here and there.
      </p>
      
      <figure class="flex-none w-36 h-auto md:w-auto md:h-80">
        <img class="border-2 border-white rounded-full h-auto md:w-auto md:h-80" src="./headshot.jpg" alt="My headshot, I look great!"/>
      </figure>
      
    </div>

    <div id="blurb" class="transition-opacity duration-1000 opacity-0">

      <hr class="w-2/4 m-auto my-8" />

      <p>
        My background is in Economics, though I'm not sure I was ever particularly good at it!
        But I was pretty good at data modeling, enjoy math and reasoning, and started applying myself to learning SQL.
        From there I got into VBA, and found out I really love programming. In the years since, I've had the opportunity to really expand the programming tools I work with,
        which led to Web Developement and C# .NET desktop apps.
        <br>
        And that leads us to now, where I want to show off some of the fun stuff I've built and worked with along the way!
      </p>
      
      <hr class="w-2/4 m-auto my-8" />
        <h2>Some skills and tools in my kit...</h2>

        <article class="flex flex-wrap justify-center">

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Vue.js</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>BULMA.css</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>.NET</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Accessible design</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Responsive design</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Design patterns</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>git</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Agile</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>APIs</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>TDD (not as often as I should)</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

        </article>
    </div>
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "container max-w-screen-lg m-auto p-2";
  const pic = root.querySelector("#pic");
  if (pic) {
    setTimeout(() => {
      pic.classList.remove("opacity-0");
      pic.classList.add("opacity-1");
    }, 150);
  }
  const blurb = root.querySelector("#blurb");
  if (blurb) {
    setTimeout(() => {
      blurb.classList.remove("opacity-0");
      blurb.classList.add("opacity-1");
    }, 350);
  }
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const projects = [
  {
    name: "ProjectsTrackingApp",
    blurb: "Project tracking app that brings together a lot of the little elements I've worked on. Inspired by DevOps and other apps like it.",
    hash: "#project/ipt"
  },
  {
    name: "AppsServer",
    blurb: "Lightweight Google Apps Script/JavaScript library modelled on Express.",
    hash: "#project/appsserver"
  },
  {
    name: "AppsSchemaValidation",
    blurb: "Google Apps Script/JavaScript library for applying a schema to data objects. Most helpful when using Google Sheets as a cheap and easy backend for Apps Script apps :)",
    hash: "#project/asv"
  },
  {
    name: "SheetDataAccess",
    blurb: "CRUD operations (and more) for Google Apps Script apps using a Google Sheet as a data source. (Sometimes spreadsheets can be a database!)",
    hash: "#project/sda"
  },
  {
    name: "AppTimerComponent",
    blurb: "Vue timer component that you can set up in any corner of the browser window. Kinda neat",
    hash: "#project/apptimer"
  },
  {
    name: "DocumentImportProcess",
    blurb: "C# .NET console application that transforms a directory of files into a .zip package for import into a document repository.",
    hash: "#project/dip"
  }
];
const ProjectCard = (props) => {
  const template = `
    <div>
      <p>
        <span class="text-blue-400">project</span> <span id="p-title" class="text-green-400"></span> <span class="text-gray-200">{</span>
      </p>
      <p class="pl-4 my-2 border-l border-l-gray-600"></p>
      <span class="text-gray-200">}</span>
    </div>
  `;
  const root = document.createElement("a");
  root.innerHTML = template;
  root.className = "w-full h-full flex rounded-xl p-2 my-8 outline-2 hover:outline hover:outline-blue-500 focus:outline focus:outline-blue-500";
  root.href = props.detail.hash;
  const title = root.querySelector("#p-title");
  const [_, blurb] = [...root.querySelectorAll("p")];
  const render = () => {
    title.textContent = props.detail.name;
    blurb.textContent = props.detail.blurb;
  };
  return {
    attach: attach(root),
    render
  };
};
const Projects = () => {
  const template = `
    <ul class="md:flex md:flex-wrap md:justify-center">
    </ul>
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "container m-auto";
  const ul = root.querySelector("ul");
  const render = () => {
    if (!ul) return;
    ul.innerHTML = "";
    const cards = projects.map((detail) => ProjectCard({ detail }));
    cards.forEach((card, i) => {
      const li = document.createElement("li");
      li.className = "md:w-1/2 md:h-60 transition-opacity duration-1000 opacity-0 p-3";
      setTimeout(() => {
        li.classList.remove("opacity-0");
        li.classList.add("opacity-1");
      }, (i + 1) * 150);
      card.attach(li);
      card.render();
      ul == null ? void 0 : ul.appendChild(li);
    });
  };
  render();
  return {
    attach: attach(root),
    render
  };
};
const Contact = () => {
  const template = `

    <div id="links" class="transition-opacity duration-1000 opacity-0 mt-40">

      <p class="mt-20 mb-4 text-center text-3xl">
        Get in touch!
      </p>

      <div class="flex items-center justify-center gap-2">
        <figure class="inline-block">
          <img src="./LI-In-Bug.png" alt="LinkedIn" class="w-auto h-8"/>
        </figure>
        <a href="https://www.linkedin.com/in/nicholas-luedde" target="_blank" rel="noopener noreferrer" class="hover:underline focus:underline focus:text-sky-300 hover:text-sky-300">LinkedIn</a>
      </div>
      
      <p class="mt-20 mb-4 text-center text-3xl">
        Check me out on GitHub
      </p>
      
      <div class="flex items-center justify-center gap-2">
        <figure class="inline-block">
          <img src="./github-mark-white.svg" alt="GitHub" class="w-auto h-8"/>
        </figure>
        <a href="https://github.com/nick-luedde" target="_blank" rel="noopener noreferrer" class="hover:underline focus:underline focus:text-sky-300 hover:text-sky-300">GitHub</a>
      </div>
    </div>

    <div id="blurb" class="transition-opacity duration-1000 opacity-0">

    </div>
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "container max-w-screen-lg m-auto p-2";
  const links = root.querySelector("#links");
  if (links) {
    setTimeout(() => {
      links.classList.remove("opacity-0");
      links.classList.add("opacity-1");
    }, 150);
  }
  const blurb = root.querySelector("#blurb");
  if (blurb) {
    setTimeout(() => {
      blurb.classList.remove("opacity-0");
      blurb.classList.add("opacity-1");
    }, 350);
  }
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
class AppsSchemaValidation {
  /**
   * Not sure if this is helpfull, but could be mildly for performance when do a lot of real-time validation
   * Saves a little time and space to have a cached 'singleton' type instances, but could be a bad pattern, dunno really...
   */
  static instance() {
    if (!AppsSchemaValidation.__instance__)
      AppsSchemaValidation.__instance__ = AppsSchemaValidation.asv();
    const instance = AppsSchemaValidation.__instance__;
    return instance;
  }
  static asv() {
    const sym = Symbol("validation");
    const isRawSimpleSchema = (obj) => !isNullish(obj) && typeof obj.type === "string";
    const isSchema = (obj) => !isNullish(obj) && !!obj[sym];
    const isSchemaType = (obj) => isSchema(obj) || Object.values(obj).every(isSchema);
    const isNullish = (v) => v === null || v === void 0 || v === "";
    const isMissing = (v) => isNullish(v) || Number.isNaN(v) || Array.isArray(v) && v.length === 0;
    const verifyWithMessage = (valid, msg) => !valid && msg;
    const toDateString = (dt) => {
      if (!dt || !(dt instanceof Date))
        return "";
      const year = dt.getFullYear();
      const month = String(dt.getMonth() + 1).padStart(2, "0");
      const day = String(dt.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const toDateTimeString = (dt) => {
      if (!dt || !(dt instanceof Date))
        return "";
      const year = dt.getFullYear();
      const month = String(dt.getMonth() + 1).padStart(2, "0");
      const day = String(dt.getDate()).padStart(2, "0");
      const hours = String(dt.getHours()).padStart(2, "0");
      const minutes = String(dt.getMinutes()).padStart(2, "0");
      const seconds = String(dt.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const helpers = {
      functionInGlobal: (prop, fnName) => prop in globalThis && !isNullish(globalThis[prop]) && typeof globalThis[prop][fnName] === "function",
      pseudoRandomId: () => {
        const chars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"];
        const LEN = 10;
        let id = "";
        for (let i = 0; i < LEN; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          id += char;
        }
        return id;
      },
      generateId: () => helpers.functionInGlobal("Utilities", "getUuid") ? Utilities.getUuid() : helpers.functionInGlobal("crypto", "randomUUID") ? crypto.randomUUID() : helpers.pseudoRandomId(),
      getAuditUser: () => helpers.functionInGlobal("Session", "getActiveUser") ? Session.getActiveUser().getEmail() : null
    };
    const checks = {
      required: (val) => verifyWithMessage(!isMissing(val), "Is required"),
      max: (mx) => (val) => !isNullish(val) && verifyWithMessage(val <= mx, `Must be less than ${mx}`),
      min: (mn) => (val) => !isNullish(val) && verifyWithMessage(val >= mn, `Must be greater than ${mn}`),
      maxlength: (mx) => (val) => !isNullish(val) && verifyWithMessage(val.length <= mx, `Must be less than ${mx} in length`),
      minlength: (mn) => (val) => !isNullish(val) && verifyWithMessage(val.length >= mn, `Must be greater than ${mn} in length`),
      any: {
        is: () => false,
        toStorage: (val) => String(val),
        fromStorage: (val) => val
      },
      number: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "number", "Is not a number"),
        toStorage: (val) => isNullish(val) ? null : Number(val),
        fromStorage: (val) => isNullish(val) ? null : Number(val)
      },
      string: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "string", "Is not a string"),
        toStorage: (val) => isNullish(val) ? null : String(val),
        fromStorage: (val) => isNullish(val) ? null : String(val)
      },
      id: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "string", "Is not a string id"),
        toStorage: (val) => isNullish(val) ? null : String(val),
        fromStorage: (val) => isNullish(val) ? null : String(val)
      },
      audit: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "string", "Is not a string audit"),
        toStorage: (val) => isNullish(val) ? null : String(val),
        fromStorage: (val) => isNullish(val) ? null : String(val)
      },
      url: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "string" && val.startsWith("https://"), "Is not an 'https://' url"),
        sanitize: (val) => isNullish(val) ? null : /^(https:\/\/)/i.test(val) ? val : null,
        toStorage: (val) => isNullish(val) ? null : checks.url.sanitize(val),
        fromStorage: (val) => isNullish(val) ? null : checks.url.sanitize(val)
      },
      boolean: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "boolean", "Is not a boolean"),
        toStorage: (val) => isNullish(val) ? null : Boolean(val),
        fromStorage: (val) => isNullish(val) ? null : typeof val === "string" ? val === "TRUE" : Boolean(val)
      },
      date: {
        is: (val) => !isNullish(val) && verifyWithMessage(val instanceof Date, "Is not a date"),
        toStorage: (val) => isNullish(val) ? null : toDateString(new Date(val)),
        fromStorage: (val) => isNullish(val) ? null : new Date(val)
      },
      datestring: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "string" && /[\d]+-[\d]{2}-[\d]{2}/.test(val), "Is not a date-string"),
        toStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "string" && val !== "") return val;
          if (val instanceof Date) return toDateString(val);
          return null;
        },
        fromStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "string" && val !== "") return val;
          if (val instanceof Date) return toDateString(val);
          return null;
        }
      },
      datetimestring: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "string" && /[\d]+-[\d]{2}-[\d]{2}\s[\d]{1,2}:[\d]{2}:[\d]{2}/.test(val), "Is not a datetime string"),
        toStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "string" && val !== "") return val;
          if (val instanceof Date) return toDateTimeString(val);
          return null;
        },
        fromStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "string" && val !== "") return val;
          if (val instanceof Date) return toDateTimeString(val);
          return null;
        }
      },
      jsondate: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "string" && /[\d]+-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}[A-Z]/.test(val), "Is not a json date string"),
        toStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "string" && val !== "") return val;
          if (val instanceof Date) return val.toJSON();
          return null;
        },
        fromStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "string" && val !== "") return val;
          if (val instanceof Date) return val.toJSON();
          return null;
        }
      },
      timestamp: {
        is: (val) => checks.jsondate.is(val),
        toStorage: (val) => {
          if (typeof val === "string" && val !== "") return val;
          if (val instanceof Date) return val.toJSON();
          return null;
        },
        fromStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "string" && val !== "") return val;
          if (val instanceof Date) return val.toJSON();
          if (typeof val === "object" && !isNullish(val.seconds)) {
            const tts = /* @__PURE__ */ new Date(0);
            tts.setUTCSeconds(val.seconds);
            return tts.toJSON();
          }
          return null;
        }
      },
      array: {
        is: (val) => !isNullish(val) && verifyWithMessage(Array.isArray(val), "Is not an array"),
        toStorageRaw: (val) => {
          if (isNullish(val)) return null;
          if (Array.isArray(val)) return val;
          return null;
        },
        toStorage: (val) => {
          if (isNullish(val)) return null;
          if (Array.isArray(val)) return JSON.stringify(val);
          if (typeof val === "string" && val !== "") return val;
          return null;
        },
        fromStorage: (val) => {
          if (isNullish(val)) return null;
          if (Array.isArray(val)) return val;
          if (typeof val === "string") {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed : null;
          }
          return null;
        }
      },
      object: {
        is: (val) => !isNullish(val) && verifyWithMessage(typeof val === "object", "Is not an object"),
        toStorageRaw: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "object") return val;
          return null;
        },
        toStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "object") return JSON.stringify(val);
          if (typeof val === "string" && val !== "") return val;
          return null;
        },
        fromStorage: (val) => {
          if (isNullish(val)) return null;
          if (typeof val === "object") return val;
          if (typeof val === "string") return JSON.parse(val);
          return null;
        }
      },
      file: {
        is: (val) => checks.object.is(val),
        toStorage: (val) => checks.object.toStorage(val),
        fromStorage: (val) => checks.object.fromStorage(val),
        types: (types2) => (val) => !isNullish(val) && verifyWithMessage(types2.some(val.type), "Is not an accepted file type"),
        size: (mx) => (val) => !isNullish(val) && verifyWithMessage(val.size <= mx, "Is too large")
      }
    };
    const base = (type) => {
      const ctx = {
        type,
        label: void 0,
        rules: [],
        client: {},
        defaultFn: void 0,
        updateFn: void 0,
        sub: {
          schema: void 0,
          isSimple: false
        },
        valid: {
          isValid: (val, mdl) => !ctx.valid.check || verifyWithMessage(ctx.valid.check(val, mdl), ctx.valid.msg),
          check: void 0,
          msg: ""
        }
      };
      const hasLength = ctx.type === "array" || ctx.type === "string";
      const api = {
        [sym]: true,
        type: ctx.type,
        label: {
          get: () => ctx.label,
          set: (val) => {
            ctx.label = val;
            return api;
          }
        },
        required: () => {
          ctx.rules.push(checks.required);
          ctx.client.required = true;
          return api;
        },
        max: (mx) => {
          if (hasLength) {
            ctx.rules.push(checks.maxlength(mx));
            ctx.client.maxlength = mx;
          } else {
            ctx.rules.push(checks.max(mx));
            ctx.client.max = mx;
          }
          return api;
        },
        min: (mn) => {
          if (hasLength) {
            ctx.rules.push(checks.minlength(mn));
            ctx.client.minlength = mn;
          } else {
            ctx.rules.push(checks.min(mn));
            ctx.client.min = mn;
          }
          return api;
        },
        default: (fn) => {
          ctx.defaultFn = fn;
          return api;
        },
        update: (fn) => {
          ctx.updateFn = fn;
          return api;
        },
        valid: (fn, msg) => {
          ctx.valid.check = fn;
          ctx.valid.msg = msg || "Is not valid";
          ctx.rules.push(ctx.valid.isValid);
          return api;
        },
        resolver: (fn) => {
          ctx.resolver = fn;
          return api;
        },
        schema: (obj) => {
          ctx.sub.isSimple = isSchema(obj) || isRawSimpleSchema(obj);
          ctx.sub.schema = isSchema(obj) ? { v: obj } : isSchemaType(obj) ? obj : ctx.sub.isSimple ? fromRaw({ v: obj }) : fromRaw(obj);
          return api;
        },
        client: {
          get: ctx.client,
          set: (vals) => {
            Object.entries(vals).forEach(([key, val]) => ctx.client[key] = val);
            return api;
          }
        },
        evaluate: (val, model) => {
          const results = {
            errors: ctx.rules.map((rule) => rule(val, model)).filter((r) => !!r),
            hasError: false
          };
          let hasError = results.errors.length > 0;
          if (ctx.sub.schema && !isNullish(val)) {
            if (ctx.type === "array" && Array.isArray(val)) {
              const subvalidation = val.map((entry) => {
                const res = validateComplete(ctx.sub.schema, ctx.sub.isSimple ? { v: entry } : entry, model);
                hasError = hasError || res.hasError;
                return ctx.sub.isSimple ? res.item.v : res;
              });
              results.items = subvalidation;
            } else {
              const subvalidation = validateComplete(ctx.sub.schema, val, model);
              results.errors = [...results.errors, ...subvalidation.errors];
              results.item = subvalidation.item;
              hasError = hasError || subvalidation.hasError;
            }
          }
          results.hasError = hasError;
          return results;
        },
        apply: (val, model, { isNew } = {}) => {
          if (isNew && isNullish(val) && ctx.defaultFn) val = ctx.defaultFn();
          if (ctx.updateFn) val = ctx.updateFn(model);
          if (ctx.resolver) val = ctx.resolver(val);
          if (ctx.sub.schema && !isNullish(val))
            if (ctx.type === "array" && Array.isArray(val)) {
              val = val.map((entry) => {
                const res = applyComplete(ctx.sub.schema, ctx.sub.isSimple ? { v: entry } : entry, model, { isNew, noStringify: true });
                return ctx.sub.isSimple ? res.v : res;
              });
            } else {
              val = applyComplete(ctx.sub.schema, val, model, { isNew });
            }
          return val;
        },
        exec: (val, model, { isNew, noStringify } = {}) => {
          const applied = api.apply(val, model, { isNew });
          const validation = api.evaluate(applied, model);
          const storage = noStringify ? checks[ctx.type].toStorageRaw(applied) : checks[ctx.type].toStorage(applied);
          return { validation, storage };
        },
        parse: (val) => checks[ctx.type].fromStorage(val)
      };
      return { ctx, api };
    };
    const types = {
      /** @returns {AsvAny} */
      any: () => {
        const { api } = base("any");
        return api;
      },
      /** @returns {AsvNumber} */
      number: () => {
        const { ctx, api } = base("number");
        ctx.rules.push(checks.number.is);
        api.client.set({ type: "number" });
        return api;
      },
      /** @returns {AsvString} */
      string: () => {
        const { ctx, api } = base("string");
        ctx.rules.push(checks.string.is);
        api.client.set({ type: "text" });
        return api;
      },
      /** @returns {AsvId} */
      id: () => {
        const { ctx, api } = base("id");
        ctx.rules.push(checks.id.is);
        api.client.set({ type: "text" });
        ctx.defaultFn = helpers.generateId;
        return api;
      },
      /** @returns {AsvUrl} */
      url: () => {
        const { ctx, api } = base("url");
        ctx.rules.push(checks.url.is);
        api.client.set({ type: "text", "pattern": "^(https://.*)" });
        return api;
      },
      /** @returns {AsvBoolean} */
      boolean: () => {
        const { ctx, api } = base("boolean");
        ctx.rules.push(checks.boolean.is);
        return api;
      },
      /** @returns {AsvDate} */
      date: () => {
        const { ctx, api } = base("date");
        ctx.rules.push(checks.date.is);
        api.client.set({ type: "date" });
        return api;
      },
      /** @returns {AsvDateString} */
      datestring: () => {
        const { ctx, api } = base("datestring");
        ctx.rules.push(checks.datestring.is);
        api.client.set({ type: "date" });
        return api;
      },
      /** @returns {AsvDateTimeString} */
      datetimestring: () => {
        const { ctx, api } = base("datetimestring");
        ctx.rules.push(checks.datetimestring.is);
        api.client.set({ type: "datetime-local" });
        return api;
      },
      /** @returns {AsvJsonDate} */
      jsondate: () => {
        const { ctx, api } = base("jsondate");
        ctx.rules.push(checks.jsondate.is);
        api.client.set({ type: "date" });
        return api;
      },
      /** @returns {AsvTimestamp} */
      timestamp: () => {
        const { ctx, api } = base("timestamp");
        ctx.rules.push(checks.timestamp.is);
        api.client.set({ type: "datetime-local" });
        api.default = () => {
          ctx.defaultFn = () => (/* @__PURE__ */ new Date()).toJSON();
          return api;
        };
        api.update = () => {
          ctx.updateFn = () => (/* @__PURE__ */ new Date()).toJSON();
          return api;
        };
        return api;
      },
      /** @returns {AsvAudit} */
      audit: () => {
        const { ctx, api } = base("audit");
        ctx.rules.push(checks.audit.is);
        api.client.set({ type: "text" });
        const getter = helpers.getAuditUser;
        api.default = () => {
          ctx.defaultFn = getter;
          return api;
        };
        api.update = () => {
          ctx.updateFn = getter;
          return api;
        };
        return api;
      },
      /** @returns {AsvArray} */
      array: () => {
        const { ctx, api } = base("array");
        ctx.rules.push(checks.array.is);
        return api;
      },
      /** @returns {AsvObject} */
      object: () => {
        const { ctx, api } = base("object");
        ctx.rules.push(checks.object.is);
        return api;
      },
      /** @returns {AsvFile} */
      file: () => {
        const { ctx, api } = base("file");
        ctx.rules.push(checks.file.is);
        api.client.set({ max: 1 });
        ctx.sub.schema = {
          id: types.string(),
          name: types.string(),
          url: types.url(),
          size: types.number(),
          type: types.string()
        };
        api.types = (types2) => {
          const acceptedTypes = Array.isArray(types2) ? types2 : String(types2).split(",").map((t) => t.trim());
          ctx.rules.push(checks.file.types(acceptedTypes));
          ctx.client.accept = acceptedTypes.join(",");
          return api;
        };
        api.size = (mx) => {
          ctx.rules.push(checks.file.size(mx));
          ctx.client.maxsize = mx;
          return api;
        };
        return api;
      }
    };
    const validateComplete = (scheme, obj, model) => {
      const results = { errors: [], item: {}, hasError: false };
      Object.entries(scheme).forEach(([key, sch]) => {
        const value = obj ? obj[key] : null;
        const evaluated = sch.evaluate(value, model);
        results.item[key] = evaluated;
        results.hasError = results.hasError || evaluated.hasError;
      });
      return results;
    };
    const validate = (schema, obj, { throwError } = {}) => {
      const results = validateComplete(schema, obj, obj);
      if (throwError && results.hasError)
        throw new Error(JSON.stringify(results));
      return results;
    };
    const applyComplete = (scheme, obj, model, { isNew, noStringify }) => {
      const newObj = {};
      Object.entries(scheme).forEach(([key, sch]) => {
        const value = obj ? obj[key] : null;
        newObj[key] = sch.apply(value, model, { isNew, noStringify });
      });
      return newObj;
    };
    const execComplete = (scheme, obj, model, { isNew, noStringify }) => {
      const newObj = {};
      const results = {};
      let hasError = false;
      Object.entries(scheme).forEach(([key, sch]) => {
        const value = obj ? obj[key] : null;
        const { storage, validation } = sch.exec(value, model, { isNew, noStringify });
        newObj[key] = storage;
        results[key] = validation.errors;
        hasError = hasError || validation.hasError;
      });
      return { newObj, results, hasError };
    };
    const exec = (scheme, obj, { isNew, throwError }) => {
      const { newObj, results, hasError } = execComplete(scheme, obj, obj, { isNew });
      if (hasError && throwError)
        throw new Error(JSON.stringify(results));
      return newObj;
    };
    const errorsToArray = (results, path = "") => {
      if (!results.hasError)
        return [];
      let errors = [];
      let topErrors = results.errors || [];
      if (topErrors.length > 0)
        errors.push({ path, errors: topErrors });
      const item = results.item || {};
      Object.entries(item).forEach(([key, res]) => {
        if (res.errors.length > 0)
          errors.push({ path: `${path}${key}`, errors: res.errors });
        if (Array.isArray(res.items))
          errors = [...errors, ...res.items.map((ch, i) => errorsToArray(ch, `${path}${key}[${i}].`)).flat()];
        if (res.item)
          errors = [...errors, ...errorsToArray(res, `${path}${key}.`)];
      });
      const items = results.items || [];
      items.forEach((res) => {
        errors = [...errors, ...errorsToArray(res, path)];
      });
      return errors;
    };
    const parseComplete = (scheme, obj) => {
      const newObj = {};
      Object.entries(scheme).forEach(([key, sch]) => {
        const value = obj ? obj[key] : null;
        newObj[key] = sch.parse(value);
      });
      return newObj;
    };
    const genComplete = (scheme, obj, model, { empty }) => {
      Object.entries(scheme).forEach(([key, sch]) => {
        let value = empty ? null : sch.apply(null, model, { isNew: true });
        if (!isNullish(value) && typeof value === "object" && sch.schema)
          value = genComplete(sch.schema, value, model, { empty });
        obj[key] = value;
      });
      return obj;
    };
    const build = (schema) => getContext(schema);
    const fromRaw = (raw) => {
      const built = {};
      Object.entries(raw).forEach(([key, sch]) => {
        const creator = types[sch.type];
        if (!creator)
          throw new Error(`${sch.type} is not a valid AppsSchemaValidation type!`);
        const type = creator();
        if (sch.label) type.label.set(sch.label);
        if (sch.required) type.required();
        if (sch.max !== void 0) type.max(sch.max);
        if (sch.min !== void 0) type.min(sch.min);
        if (sch.default) type.default(sch.default);
        if (sch.update) {
          if (typeof sch.update === "function")
            type.update(sch.update);
          else
            type.update(sch.update.fn, sch.update.msg);
        }
        if (sch.schema) type.schema(sch.schema);
        if (sch.resolver) type.resolver(sch.resolver);
        if (sch.types) type.types(sch.types);
        if (sch.size) type.size(sch.size);
        if (sch.client) type.client.set(sch.client);
        built[key] = type;
      });
      return built;
    };
    const compile = (raw) => {
      const built = fromRaw(raw);
      return build(built);
    };
    const getContext = (schema) => {
      return {
        schema,
        test: (obj) => validate(schema, obj, { throwError: true }),
        apply: (obj, { isNew } = {}) => applyComplete(schema, obj, obj, { isNew }),
        validate: (obj, { throwError = false } = {}) => validate(schema, obj, { throwError }),
        exec: (obj, { isNew, throwError = true } = {}) => exec(schema, obj, { isNew, throwError }),
        errors: (obj) => errorsToArray(validate(schema, obj)),
        parse: (obj) => parseComplete(schema, obj),
        generate: (obj = {}, { empty = false } = {}) => genComplete(schema, obj, obj, { empty })
      };
    };
    return {
      ...types,
      build,
      compile
    };
  }
}
const Asv = () => {
  const template = `
    <h1 class="text-green-400 text-xl mb-4">AppsSchemaValidation</h1>
    <p>
      Needed validation! Used this as an opportunity to write a bit of a validation tool from the ground up.
      Built it to work on the server and in the browser.
        <br>
        <br>
        <a href="https://github.com/nick-luedde/asv" target="_blank" rel="noopener noreferrer" class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300">Check out the source code</a>
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p class="mb-2">
      Let's check it out in action...
    </p>

    <div class="flex flex-col md:flex-row gap-3">
      <p class="flex-1 break-all whitespace-pre-wrap p-3 bg-black border rounded-xl border-white">
<span class="text-blue-400">const</span> <span class="text-blue-200">asv</span> = <span class="text-green-400">AppsSchemaValidation</span>.<span class="text-yellow-200">asv</span>();

<span class="text-blue-400">const</span> <span class="text-blue-200">schema</span> = <span class="text-blue-200">asv</span>.<span class="text-yellow-200">build</span>({
  title: <span class="text-blue-400">asv</span>.<span class="text-yellow-200">string</span>().<span class="text-yellow-200">required</span>(),
  tags: <span class="text-blue-400">asv</span>.<span class="text-yellow-200">array</span>().<span class="text-yellow-200">schema</span>(<span class="text-blue-400">asv</span>.<span class="text-yellow-200">string</span>()),
  rating: <span class="text-blue-400">asv</span>.<span class="text-yellow-200">number</span>()
});

<span class="text-blue-400">const</span> <span class="text-blue-200">validResults</span> = <span class="text-blue-200">schema</span>.<span class="text-yellow-200">validate</span>({
  title: <span class="text-red-300">'Hey I'm valid!'</span>,
  tags: [<span class="text-red-300">'awesome'</span>, <span class="text-red-300">'rad'</span>],
  rating: 10
});
<span class="text-green-600">// Run the valid results to see the schema output</span>

<span class="text-blue-400">const</span> <span class="text-blue-200">errors</span> = <span class="text-blue-200">schema</span>.<span class="text-yellow-200">validate</span>({
  tags: [1],
  rating: <span class="text-red-300">'Not a number...'</span>
});
<span class="text-green-600">// Run the invalid results to see the schema output</span>
      </p>

      <article class="flex-1 rounded-xl bg-black border border-white">
        <div class="flex">
          <button id="valid" class="flex-1 rounded-tl-xl bg-blue-600 text-white p-2">Run valid</button>
          <button id="invalid" class="flex-1 rounded-tr-xl bg-red-700 text-white p-2">Run invalid</button>
        </div>
        <p id="result" class="whitespace-pre-wrap p-3 rounded-b-xl transition-colors duration-700"></p>
      </article>
    </div>
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "container max-w-screen-lg m-auto p-2 mt-4 transition-opacity duration-1000 opacity-0";
  setTimeout(() => {
    root.classList.remove("opacity-0");
    root.classList.add("opacity-1");
  }, 150);
  const valid = root.querySelector("#valid");
  const invalid = root.querySelector("#invalid");
  const result = root.querySelector("#result");
  const asv = AppsSchemaValidation.asv();
  const schema = asv.build({
    title: asv.string().required(),
    tags: asv.array().schema(asv.string()),
    rating: asv.number()
  });
  const runValid = () => {
    if (!valid || !result) return;
    const results = schema.validate({
      title: "Hey I'm valid!",
      tags: ["awesome", "rad"],
      rating: 10
    });
    result.classList.remove("bg-red-700");
    result.classList.add("bg-blue-600");
    result.textContent = JSON.stringify(results, null, 2);
  };
  const runInvalid = () => {
    if (!invalid || !result) return;
    const errors = schema.validate({
      tags: [1],
      rating: "Not a number..."
    });
    result.classList.remove("bg-blue-600");
    result.classList.add("bg-red-700");
    result.textContent = JSON.stringify(errors, null, 2);
  };
  valid == null ? void 0 : valid.addEventListener("click", () => {
    runValid();
  });
  invalid == null ? void 0 : invalid.addEventListener("click", () => {
    runInvalid();
  });
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const Session$1 = {
  getActiveUser() {
    return {
      getEmail() {
        return "me@test.com";
      }
    };
  }
};
class AppsServer {
  /**
   * App server definition
   * Requests made successfully through a server object will always return a json response with a body prop
   *   - The body of the response will be either json type, or html type content
   * Requests that error will return a json response with an error prop
   *   - The error of the response will be an object with at minimum a message, but may also have a cause property
   * @param {*} options 
   */
  static create(options = {}) {
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
      JSON: "application/json",
      HTML: "text/html",
      CSV: "text/csv",
      JS: "js/object",
      RAW: "data/raw"
    };
    const parseRouteWithParams = (route) => {
      const params = {};
      const [routestr, paramstr] = route.split("?");
      if (!paramstr)
        return {
          route: routestr,
          params
        };
      const elements = paramstr.split("&");
      elements.forEach((el) => {
        const [prop, val] = el.split("=");
        params[decodeURIComponent(prop)] = decodeURIComponent(val);
      });
      return {
        route: routestr,
        params
      };
    };
    const findTokenRoute = (req, method) => {
      const tokenRoutes = Object.keys(method).filter((key) => key.includes(":"));
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
    const tokenizeRoute = (route) => {
      const parts = route.split("/");
      const tokens = [];
      parts.forEach((p, i) => {
        if (p.startsWith(":")) {
          tokens.push([parts[i - 1] || "", p, parts[i + 1] || ""]);
        }
      });
      const matcher = route.replace(/:[^/]*/g, "[^/]*");
      const isMatch = (sent) => new RegExp(matcher).test(sent);
      const paramsFromTokens = (sent) => {
        const params = {};
        tokens.forEach((t) => {
          const key = t[1].replace(":", "");
          const before = t[0];
          const after = t[2];
          const [match] = sent.match(`(?<=.*/${before !== void 0 ? before : ""}/)([^/]*)(?=/?${after !== void 0 ? after : ""}.*)`) || [];
          params[key] = decodeURIComponent(match || "");
        });
        return params;
      };
      return { isMatch, paramsFromTokens };
    };
    const matchRoute = (pattern, route) => new RegExp(pattern).test(route);
    const middleware = [];
    const use = (route, fn) => {
      const mw = (req, res, next) => {
        if (!matchRoute(route, req.route))
          return next();
        return fn(req, res, next);
      };
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
    const inspect = () => {
      let details = "AppsServer inspect:\n\n";
      details += "GET ROUTES\n";
      details += "---------------------\n";
      details += Object.keys(gets).join("\n");
      details += "\n---------------------\n\n";
      details += "POST ROUTES\n";
      details += "---------------------\n";
      details += Object.keys(posts).join("\n");
      details += "\n---------------------\n\n";
      details += "DELETE ROUTES\n";
      details += "---------------------\n";
      details += Object.keys(deletes).join("\n");
      details += "\n---------------------\n\n";
      console.log(details);
      return details;
    };
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
        const template = html ? HtmlService.createTemplate(html) : file ? HtmlService.createTemplateFromFile(file) : HtmlService.createTemplate("");
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
    const mwstack = (req, res, handlers) => {
      let index = 0;
      const all = [
        ...middleware,
        ...handlers
      ];
      const nxt = (i) => {
        index = i;
        let mw = all[index];
        if (!mw) {
          if (index === all.length)
            return res.status(STATUS_CODE.NOT_FOUND).send({ message: `${req.route} not a valid route!` });
          else
            throw new Error(`Something went wrong in the mw stack for index ${index}`);
        }
        return mw(req, res, nxt.bind(null, index + 1));
      };
      return nxt(0);
    };
    const request = (req) => {
      try {
        req.by = Session$1.getActiveUser().getEmail();
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
        debug && console.time("mwstack");
        mwstack(req, res, handler);
        debug && console.timeEnd("mwstack");
        return res.res;
      } catch (err) {
        const error2 = err;
        const res = response();
        console.error(error2);
        console.error(error2.stack);
        res.status(error2.code || STATUS_CODE.SERVER_ERROR).send({
          name: error2.name,
          message: error2.code ? error2.message : "Something went wrong!",
          stack: debug ? error2.stack : void 0
        });
        errors.forEach((handler) => {
          try {
            handler(error2, req);
          } catch (inner) {
            const handlerError = inner;
            console.error(handlerError);
            console.error(handlerError.stack);
          }
        });
        if (debug) {
          console.log("error-request", req);
          console.log("error-response", res);
        }
        return res.res;
      }
    };
    const handleClientRequest = (req = {}) => {
      if (typeof req === "string")
        req = JSON.parse(req);
      const {
        method,
        headers,
        route,
        params,
        body
      } = req;
      return request({
        method,
        headers,
        route,
        params,
        body
      }).toType();
    };
    const handleDoGet = (event = {}, { homeroute = "/" } = {}) => {
      const pathInfo = event.pathInfo === void 0 ? "" : event.pathInfo;
      const path = String(pathInfo).toLowerCase();
      if (path.startsWith("api/")) {
        const response2 = handleClientRequest({
          method: "get",
          route: path.slice(3),
          params: event.parameter
        });
        return ContentService.createTextOutput(response2).setMimeType(ContentService.MimeType.JSON);
      }
      const content = request({
        method: "get",
        route: path !== "" ? `/${path}` : homeroute,
        params: event.parameter
      });
      return content.body;
    };
    const handleDoPost = (event = {}) => {
      const pathInfo = event.pathInfo === void 0 ? "" : event.pathInfo;
      const fullPath = String(pathInfo).toLowerCase();
      const path = fullPath.startsWith("api/") ? fullPath.slice(3) : `/${fullPath}`;
      const {
        method,
        type = "application/json"
      } = event.parameter;
      const body = type === "application/json" ? JSON.parse(event.postData.contents) : event.postData.contents;
      const req = {
        method: method || "post",
        route: path,
        type,
        body
      };
      const response2 = handleClientRequest(req);
      return ContentService.createTextOutput(response2).setMimeType(ContentService.MimeType.JSON);
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
const AppsServerProject = () => {
  const template = `
    <h1 class="text-green-400 text-xl mb-4">AppsServer</h1>
    <p>
      Apps started getting bigger.
      Always liked how Express.js (and other libraries like it) apps looked and felt, and wanted to have a tool that let me do some similar things.
      <br>
      <br>
      <a href="https://github.com/nick-luedde/appsserver" target="_blank" rel="noopener noreferrer" class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300">Check out the source code</a>
    </p>
    
    <hr class="w-2/4 m-auto my-8" />

    <p class="mb-2">
      Check it out...
    </p>

    <div class="flex flex-col md:flex-row gap-3">
      <p class="flex-1 break-all whitespace-pre-wrap p-3 bg-black border rounded-xl border-white">
<span class="text-blue-400">const</span> <span class="text-blue-200">server</span> = <span class="text-green-400">AppsServer</span>.<span class="text-yellow-200">create</span>();

<span class="text-blue-200">server</span>.<span class="text-yellow-200">use</span>(<span class="text-red-300">'/.*'</span>, (<span class="text-blue-200">req</span>, <span class="text-blue-200">res</span>, <span class="text-blue-200">next</span>) => {
  <span class="text-blue-400">const</span> <span class="text-blue-200">start</span> = <span class="text-green-400">Date</span>.<span class="text-yellow-200">now</span>();
  <span class="text-yellow-200">next</span>();
  <span class="text-blue-400">const</span> <span class="text-blue-200">end</span> = <span class="text-green-400">Date</span>.<span class="text-yellow-200">now</span>();
  <span class="text-blue-200">res</span>.<span class="text-yellow-200">headers</span>({ <span class="text-red-300">'app-response-time'</span>: <span class="text-blue-200">end</span> - <span class="text-blue-200">start</span> });
});

<span class="text-blue-200">server</span>.<span class="text-yellow-200">get</span>(<span class="text-red-300">'/tasks'</span>, (<span class="text-blue-200">req</span>, <span class="text-blue-200">res</span>) => {
  <span class="text-blue-400">const</span> <span class="text-blue-200">tasks</span> = [
    { id: 1, task: <span class="text-red-300">'Build a sweet portfolio'</span>, done: <span class="text-blue-400">false</span> },
    { id: 2, task: <span class="text-red-300">'Drink coffee'</span>, done: <span class="text-blue-400">true</span> },
  ];

  <span class="text-blue-200">res</span>.<span class="text-yellow-200">status</span>(<span class="text-blue-200">server</span>.<span class="text-blue-200">STATUS_CODE</span>.<span class="text-blue-200">SUCCESS</span>).<span class="text-yellow-200">send</span>(<span class="text-blue-200">tasks</span>);
});

<span class="text-blue-200">server</span>.<span class="text-yellow-200">post</span>(<span class="text-red-300">'/task/save'</span>, (<span class="text-blue-200">req</span>, <span class="text-blue-200">res</span>) => {
  <span class="text-blue-400">const</span> <span class="text-blue-200">task</span> = <span class="text-blue-200">req</span>.<span class="text-blue-200">body</span>;
  <span class="text-blue-200">console</span>.<span class="text-yellow-200">log</span>(<span class="text-blue-200">task</span>);

  <span class="text-blue-200">res</span>.<span class="text-yellow-200">status</span>(<span class="text-blue-200">server</span>.<span class="text-blue-200">STATUS_CODE</span>.<span class="text-blue-200">SUCCESS</span>).<span class="text-yellow-200">send</span>({ message: <span class="text-red-300">'Task totally saved, and not just logged to the console!'</span> });
});


<span class="text-blue-400">const</span> <span class="text-blue-200">taskResponse</span> = <span class="text-blue-200">server</span>.<span class="text-yellow-200">request</span>({
  method: <span class="text-red-300">'get'</span>,
  route: <span class="text-red-300">'/tasks'</span>
});
<span class="text-green-600">// Run the get tasks route</span>

<span class="text-blue-400">const</span> <span class="text-blue-200">saveResponse</span> = <span class="text-blue-200">server</span>.<span class="text-yellow-200">request</span>({
  method: <span class="text-red-300">'post'</span>,
  route: <span class="text-red-300">'/task/save'</span>,
  body: { id: 2, task: <span class="text-red-300">'Build a sweet portfolio'</span>, done: <span class="text-blue-400">true</span> }
});
<span class="text-green-600">// Run the save task route</span>
      </p>

      <article id="runner" class="flex-1 rounded-xl bg-black border border-white transition-colors duration-700">
        <div class="flex">
          <button id="tasks" class="flex-1 rounded-tl-xl bg-blue-900 text-white p-2">GET /tasks</button>
          <button id="save" class="flex-1 rounded-tr-xl bg-indigo-800 text-white p-2">POST /task/save</button>
          </div>
        <p id="result" class="whitespace-pre-wrap p-3 rounded-b-xl"></p>
      </article>
    </div>
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "container max-w-screen-lg m-auto p-2 mt-4 transition-opacity duration-1000 opacity-0";
  setTimeout(() => {
    root.classList.remove("opacity-0");
    root.classList.add("opacity-1");
  }, 150);
  const tasks = root.querySelector("#tasks");
  const save = root.querySelector("#save");
  const result = root.querySelector("#result");
  const runner = root.querySelector("#runner");
  const server = AppsServer.create();
  server.use("/.*", (_req, res, next) => {
    const start = Date.now();
    next();
    const end = Date.now();
    res.headers({ "app-response-time": String(end - start) });
  });
  server.get("/tasks", (_req, res) => {
    const tasks2 = [
      { id: 1, task: "Build a sweet portfolio", done: false },
      { id: 2, task: "Drink coffee", done: true }
    ];
    res.status(server.STATUS_CODE.SUCCESS).send(tasks2);
  });
  server.post("/task/save", (req, res) => {
    const task = req.body;
    console.log(task);
    res.status(server.STATUS_CODE.SUCCESS).send({ message: "Task totally saved, and not just logged to the console!" });
  });
  const runTasks = () => {
    if (!save || !result || !runner) return;
    const taskResponse = server.request({
      method: "get",
      route: "/tasks"
    });
    runner.classList.remove("bg-indigo-800");
    runner.classList.add("bg-blue-900");
    result.textContent = JSON.stringify(taskResponse, null, 2);
  };
  const runSave = () => {
    if (!tasks || !result || !runner) return;
    const saveResponse = server.request({
      method: "post",
      route: "/task/save",
      body: { id: 2, task: "Build a sweet portfolio", done: true }
    });
    runner.classList.remove("bg-blue-900");
    runner.classList.add("bg-indigo-800");
    result.textContent = JSON.stringify(saveResponse, null, 2);
  };
  save == null ? void 0 : save.addEventListener("click", () => {
    runSave();
  });
  tasks == null ? void 0 : tasks.addEventListener("click", () => {
    runTasks();
  });
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const Apptimer = () => {
  const template = `
    <section class="container max-w-screen-lg m-auto">
      <h1 class="text-green-400 text-xl mb-4">AppTimerComponent</h1>
      <p>
        Cool set of Vue.js components. One lets you dock the element to any corner of the browser window. The other is a stopwatch/timer. Put them together and you've got timer overlay that you can keep around, but outta the way.
        <br>
        <br>
        <a href="https://github.com/nick-luedde/app-timer" target="_blank" rel="noopener noreferrer" class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300">Check out the source code</a>
      </p>

      <hr class="w-2/4 m-auto my-8" />

      <p class="mb-11">
        Check it out in this sample app below.
      </p>
    </section>
    
    <section class="w-full h-[calc(100vh-70px)] px-2">
      <div class="border w-full h-full border-white">
        <iframe class="w-full h-full" src="./timer.html"></iframe>
      <div>
    </section>
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "px-2 mt-4 transition-opacity duration-1000 opacity-0";
  setTimeout(() => {
    root.classList.remove("opacity-0");
    root.classList.add("opacity-1");
  }, 150);
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const DIP = () => {
  const template = `
    <h1 class="text-green-400 text-xl mb-4">DIP C# Console Application</h1>
    <p>
      Co-worker had a bit of a process for manually compiling a folder full of documents into a spreadsheet of metadata and a .zip directory.
      It was all mapped out in their step-by-step guide document, took the oportunity to translate those steps into a cool little C# Console Application
      to automate some of the tedium! 
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p class="mb-2">
      Here's a bit of what it looks like in action...
    </p>

    <div class="bg-black border rounded-xl border-white">
      <div class="flex">
          <button id="reset" class="flex-1 rounded-t-xl bg-blue-600 text-white p-2">Reset</button>
      </div>
      <p class="break-all whitespace-pre-wrap p-3"><span id="entry"></span><span class="animate-pulse">|</span></p>
    </div>
    
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "container max-w-screen-lg m-auto p-2 mt-4 transition-opacity duration-1000 opacity-0";
  setTimeout(() => {
    root.classList.remove("opacity-0");
    root.classList.add("opacity-1");
  }, 150);
  const entry = root.querySelector("#entry");
  const reset = root.querySelector("#reset");
  const commands = [
    "Enter DIP process type...",
    "[1] - FILES - Registrations",
    "[2] - FILES - Inspections",
    "[3] - DOCS - Annual Reports",
    "[4] - DOCS - License",
    ">> 1",
    { pause: 3 },
    "Enter the directory path for the [1] - FILES - Registrations",
    "[Enter] - to use the default path - [c:\\users\\default]",
    "    [R] - to restart",
    ">> ",
    { pause: 3 },
    "Cleaning file names...",
    "Getting file names...",
    "Setting up...",
    "Creating index file...",
    "Writing compressed folder...",
    "\n----------\nDIP file process complete, do another if you want...\n----------\n",
    "[Any key] - Run another",
    "    [Esc] - Exit",
    ">> ",
    { pause: 7 }
  ];
  const loop = async () => {
    if (!entry) return;
    entry.textContent = "";
    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      if (typeof cmd === "object") {
        const { pause } = cmd;
        await new Promise((resolve) => setTimeout(resolve, 1e3 * pause));
      } else {
        await new Promise((resolve) => setTimeout(() => {
          entry.textContent += `
${cmd}`;
          resolve(true);
        }, 150));
      }
    }
  };
  if (reset)
    reset.addEventListener("click", loop);
  setTimeout(() => loop(), 1250);
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const Sda = () => {
  const template = `
    <h1 class="text-green-400 text-xl mb-4">SheetDataAccess</h1>
    <p>
      Working on the Google Apps Script platform, Google Sheets was a cheap, easy, and mostly effective choice as a backend data source for small apps.
      Wrote the SheetDataAccess class to help make the CRUD operations a bit easier/friendlier to achieve.
      <br>
      <br>
      <a href="https://github.com/nick-luedde/sda" target="_blank" rel="noopener noreferrer" class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300">Check out the source code</a>
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p class="mb-2">
      Let's see what this one looks like...
    </p>

    <div class="flex flex-col md:flex-row gap-3">
      <p class="flex-1 break-all whitespace-pre-wrap p-3 bg-black border rounded-xl border-white">
<span class="text-blue-400">const</span> <span class="text-blue-200">ds</span> = <span class="text-green-400">SheetDataAccess</span>.<span class="text-yellow-200">create</span>({ id: <span class="text-red-300">'your-sheet-id'</span> });

<span class="text-blue-400">const</span> <span class="text-blue-200">tasks</span> = <span class="text-blue-200">ds</span>.<span class="text-blue-200">collections</span>.<span class="text-green-400">Task</span>.<span class="text-yellow-200">data</span>();
<span class="text-blue-400">const</span> <span class="text-blue-200">importantTask</span> = <span class="text-blue-200">tasks</span>.<span class="text-yellow-200">find</span>(<span class="text-blue-200">tsk</span> => <span class="text-blue-200">tsk</span>.<span class="text-blue-200">desc</span> === <span class="text-red-300">'Take a break'</span>);

<span class="text-blue-200">importantTask</span>.<span class="text-blue-200">done</span> = <span class="text-blue-400">true</span>;
<span class="text-blue-400">const</span> <span class="text-blue-200">updated</span> = <span class="text-blue-200">ds</span>.<span class="text-blue-200">collections</span>.<span class="text-green-400">Task</span>.<span class="text-yellow-200">upsertOne</span>(<span class="text-blue-200">importantTask</span>);

<span class="text-blue-400">const</span> <span class="text-blue-200">newTask</span> = {
  id: <span class="text-red-300">'456'</span>,
  desc: <span class="text-red-300">'Save the day with a bug fix'</span>,
  done: <span class="text-blue-400">false</span>
};
<span class="text-blue-400">const</span> <span class="text-blue-200">saved</span> = <span class="text-blue-200">ds</span>.<span class="text-blue-200">collections</span>.<span class="text-green-400">Task</span>.<span class="text-yellow-200">addOne</span>(<span class="text-blue-200">task</span>);
</p>

      <article class="flex-1 rounded-xl bg-black border border-white">
        <p id="result" class="break-words whitespace-pre-wrap p-3 rounded-b-xl transition-colors duration-700">
// This assumes you have a Google Sheet with the following structure...

Tab name:
----------
|  Task  |
----------

Columns: 
--------------------------------
|   id   |   desc   |   done   |
--------------------------------
        </p>
      </article>
    </div>
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "container max-w-screen-lg m-auto p-2 mt-4 transition-opacity duration-1000 opacity-0";
  setTimeout(() => {
    root.classList.remove("opacity-0");
    root.classList.add("opacity-1");
  }, 150);
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const Ipt = () => {
  const template = `
    <section class="container max-w-screen-lg m-auto">
      <h1 class="text-green-400 text-xl mb-4">ProjectsTrackingApp</h1>
      <p>
        This has been a great sandbox project for ideas. Started as a way to keep track of daily tasks in a way that was better that docs and spreadsheets.
        Have had so much fun working on it, building new features and testing out new updates to the library of tools I'm using on it.
        <br>
        <br>
        <a href="https://github.com/nick-luedde/ipt" target="_blank" rel="noopener noreferrer" class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300">Check out the source code</a>
      </p>

      <hr class="w-2/4 m-auto my-8" />

      <p class="mb-11">
        Here is a sample app running all client side with a mock server. In an AppsScript deployment it has a complete server component.
      </p>
    </section>
    
    <section class="w-full h-[calc(100vh-70px)] px-2">
      <div class="border w-full h-full border-white">
        <iframe class="w-full h-full" src="./ipt.html"></iframe>
      <div>
    </section>
  `;
  const root = document.createElement("section");
  root.innerHTML = template;
  root.className = "px-2 mt-4 transition-opacity duration-1000 opacity-0";
  setTimeout(() => {
    root.classList.remove("opacity-0");
    root.classList.add("opacity-1");
  }, 150);
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const notFound = () => {
  const root = document.createElement("section");
  root.className = "container max-w-screen-lg text-center m-auto p-2";
  root.textContent = "Not found!";
  return {
    attach: attach(root),
    render: () => {
    }
  };
};
const pageRoot = document.querySelector("#app");
const _menus = {
  bio: null,
  projects: null,
  contact: null
};
const menus = {
  bio: () => {
    if (!_menus.bio)
      _menus.bio = document.querySelector("#bio-menu");
    return _menus.bio;
  },
  projects: () => {
    if (!_menus.projects)
      _menus.projects = document.querySelector("#projects-menu");
    return _menus.projects;
  },
  contact: () => {
    if (!_menus.contact)
      _menus.contact = document.querySelector("#contact-menu");
    return _menus.contact;
  }
};
const routes = function() {
  const map = /* @__PURE__ */ new Map();
  map.set("#bio", { menu: menus.bio, page: Bio });
  map.set("#projects", { menu: menus.projects, page: Projects });
  map.set("#contact", { menu: menus.contact, page: Contact });
  map.set("#project/ipt", { menu: menus.projects, page: Ipt });
  map.set("#project/asv", { menu: menus.projects, page: Asv });
  map.set("#project/appsserver", { menu: menus.projects, page: AppsServerProject });
  map.set("#project/apptimer", { menu: menus.projects, page: Apptimer });
  map.set("#project/dip", { menu: menus.projects, page: DIP });
  map.set("#project/sda", { menu: menus.projects, page: Sda });
  return map;
}();
const goToHash = (hash) => {
  var _a;
  const opt = routes.get(hash) || { menu: null, page: notFound };
  console.log(opt);
  if (opt && pageRoot) {
    pageRoot.innerHTML = "";
    const page = opt.page();
    page.attach(pageRoot);
    const activeClasses = [
      "text-sky-200",
      "underline"
    ];
    console.log(menus);
    Object.values(menus).forEach((mn) => {
      const el = mn();
      if (el)
        el.classList.remove(...activeClasses);
    });
    if (opt.menu) {
      (_a = opt.menu()) == null ? void 0 : _a.classList.add(...activeClasses);
    }
  }
};
const navigate = (hash) => {
  const current = window.location.hash;
  if (current !== hash) {
    window.location.hash = hash;
  } else {
    goToHash(hash);
  }
};
const listen = () => window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  goToHash(hash);
});
const Header = () => {
  const template = `
    <ul class="flex">
      <li class="px-3">
        <a id="bio-menu" class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline " href="#bio">Bio</a>
      </li>
      <li class="px-3">
        <a id="projects-menu" class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline " href="#projects">Projects</a>
      </li>
      <li class="px-3">
        <a id="contact-menu" class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline " href="#contact">Contact</a>
      </li>
    </ul>
  `;
  const root = document.createElement("nav");
  root.innerHTML = template;
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const Footer = () => {
  const template = `
    <p class="text-center">Built by me, with help from Tailwind.css</p>
  `;
  const root = document.createElement("article");
  root.innerHTML = template;
  const render = () => {
  };
  return {
    attach: attach(root),
    render
  };
};
const app = document.querySelector("#app");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");
if (!app || !header || !footer)
  throw new Error("Missing app element!");
Header().attach(header);
Footer().attach(footer);
listen();
navigate(window.location.hash || "#bio");
