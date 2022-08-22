// Styles
import './styles/basic.scss'
import './styles/colors.scss'
import './styles/vars.scss'

// Data
import articles from './data/articles.json'
import { mock } from 'mockjs'

// Utils
import { throttle } from './scripts/helpers'

import Alpine from 'alpinejs'
window.Alpine = Alpine

// 导航栏
Alpine.data('navData', function () {
  return {
    init() {
      let lastScrollTop =
        window.pageYOffset || document.documentElement.scrollTop
      const scoller = throttle(() => {
        const st = window.pageYOffset || document.documentElement.scrollTop
        this.visible =
          st === lastScrollTop || st <= 250 ? true : st < lastScrollTop
        lastScrollTop = st <= 0 ? 0 : st
      }, 100)

      window.addEventListener('scroll', scoller, false)
    },
    visible: true,
    activeTab: 0,
    activeSubTab: 0,
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
    subNavList: [
      {
        label: '综合',
      },
      {
        label: '关注',
      },
      {
        label: '后端',
      },
      {
        label: '前端',
      },
      {
        label: 'IOS',
      },
      {
        label: '人工智能',
      },
      {
        label: '开发工具',
      },
      {
        label: '代码人生',
      },
      {
        label: '阅读',
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

// 文章列表数据
Alpine.data('articles', function () {
  return {
    init() {
      window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          const data = mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'mockArticle|10': [
              {
                author: '@cword(2, 5)',
                time: '@integer(1,59)',
                scope: '@cword(2)',
                title: '@cword(5, 12)',
                desc: '@csentence(25, 50)',
                views: '@integer(100,1000)',
                thumbs: '@integer(10,500)',
                comments: '@integer(10,50)',
                img: '@image("120x80", "@color", "Abc")',
              },
            ],
          })

          this.articles.push(...data.mockArticle)
        }
      }
    },
    articles,
  }
})

//主题色控制
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
