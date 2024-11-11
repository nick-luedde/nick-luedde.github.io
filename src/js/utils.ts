export const attach = (node: Element) => (el: string | Element) => {
  
  const to = typeof el === 'string'
    ? document.querySelector(`#${el}`)
    : el;

  to?.appendChild(node);
  return to;
};