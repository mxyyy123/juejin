const APPEARANCE_KEY = 'APPEARANCE_KEY'
let isDark = false

/**
 * 设置主题
 * @param {boolean} isDark
 */
function setTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

export default function useAppearance() {
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  let userPreference = localStorage?.getItem(APPEARANCE_KEY) || 'auto'
  isDark = userPreference === 'auto' ? query.matches : userPreference === 'dark'

  query.onchange = function (event) {
    if (userPreference === 'auto') {
      isDark = e.matches
      setTheme(isDark)
    }
  }

  function toggle() {
    setTheme((isDark = !isDark))
    userPreference = isDark
      ? query.matches
        ? 'auto'
        : 'dark'
      : query.matches
      ? 'light'
      : 'auto'
    localStorage.setItem(APPEARANCE_KEY, userPreference)
  }

  setTheme(isDark)

  return {
    toggle:
      typeof localStorage !== 'undefined'
        ? toggle
        : () => {
            console.error('浏览器不支持主题调节')
          },
    isDark,
  }
}
