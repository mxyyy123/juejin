/**
 * @param {HTMLElement} el
 * @param {Record<string,string>} attr
 */
export function attachAttribute(el, attr) {
    Object.keys(attr).forEach(key=>el.setAttribute(key,attr[key]))
}
