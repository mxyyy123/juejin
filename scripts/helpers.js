/**
 * @param {HTMLElement} el
 * @param {Record<string,string>} attr
 */
export function attachAttribute(el, attr) {
  Object.keys(attr).forEach(key => el.setAttribute(key, attr[key]))
}

/**
 * 节流
 * @param {Function} fn
 * @param {number} time 节流时间
 * @returns
 */
export function throttle(fn, time) {
  let task = null
  return (...args) => {
    if (!task) {
      task = setTimeout(() => {
        task = null
        fn.apply(this, args)
      }, time)
    }
  }
}
