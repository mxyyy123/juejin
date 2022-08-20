// Styles
import './styles/basic.scss'
import './styles/colors.scss'
import './styles/vars.scss'

import Alpine from 'alpinejs'
window.Alpine = Alpine

// 导航栏
Alpine.data('navData', function () {
  return {
    activeTab: 0,
    showMobilePlate: false,
    navList: [
      {
        type: 'text',
        label: '首页',
        isExtra: false,
        link: '/',
      },
      {
        type: 'text',
        label: '沸点',
        isExtra: false,
        link: '/points',
      },
      {
        type: 'text',
        label: '课程',
        isExtra: false,
        link: '/courses',
      },
      {
        type: 'text',
        label: '直播',
        isExtra: false,
        link: '/lives',
      },
      {
        type: 'text',
        label: '活动',
        isExtra: false,
        link: '/activities',
      },
      {
        type: 'text',
        label: '商城',
        isExtra: true,
        link: '/shop',
      },
      {
        type: 'img',
        src: '/vip.png',
        isExtra: true,
        link: '/discount',
      },
    ],
  }
})

// 搜索框历史
Alpine.data('searchHistory', function () {
  return {
    histories: [
      {
        text: 'JavaScript 运行机制',
      },
      {
        text: '什么是Event Loop',
      },
      {
        text: 'understand V8',
      },
    ],
    clearHistory() {
      this.histories.length = 0
    },
    addHistory() {
      this.histories.push({
        text,
      })
    },
  }
})

Alpine.store('darkMode', {
  init() {
    const APPEARANCE_KEY = 'APPEARANCE_KEY'
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    let userPreference = localStorage?.getItem(APPEARANCE_KEY) || 'auto'
    this.isDark =
      userPreference === 'auto' ? query.matches : userPreference === 'dark'

    query.onchange = event => {
      if (userPreference === 'auto') {
        this.isDark = event.matches
        setTheme(isDark)
      }
    }

    this.toggle = () => {
      setTheme((this.isDark = !this.isDark))
      userPreference = this.isDark
        ? query.matches
          ? 'auto'
          : 'dark'
        : query.matches
        ? 'light'
        : 'auto'
      localStorage.setItem(APPEARANCE_KEY, userPreference)
    }

    setTheme(this.isDark)

    /**
     * 设置主题
     * @param {boolean} isDark
     */
    function setTheme(isDark) {
      document.documentElement.setAttribute(
        'data-theme',
        isDark ? 'dark' : 'light'
      )
    }
  },
})

Alpine.start()
