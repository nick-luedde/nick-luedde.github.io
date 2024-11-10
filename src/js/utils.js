export const attach = (/** @type {Element} */ node) => (/** @type {Element | string} */ el) => {
  
  const to = typeof el === 'string'
    ? document.querySelector(`#${el}`)
    : el;

  to?.appendChild(node);
  return to;
};