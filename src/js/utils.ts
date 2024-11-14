export const attach = (node: Element) => (el: Element | string) => {
  
  const to = typeof el === 'string'
    ? document.querySelector(`#${el}`)
    : el;

  to?.appendChild(node);
  return to;
};