import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'NyaaChat 文档',
  description: 'NyaaChat 使用文档与开发指南',

  srcDir: './doc-files',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '使用指南', link: '/guide/quick-start' },
      { text: '功能特性', link: '/features/' },
      { text: '常见问题', link: '/faq' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '快速开始', link: '/guide/quick-start' },
          ],
        },
      ],
      '/features/': [
        {
          text: '功能特性',
          items: [],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc',
                },
              },
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/NyaaCaster/NyaaChat' },
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright NyaaCaster',
    },

    outline: {
      level: [2, 3],
      label: '页面导航',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    darkModeSwitchLabel: '主题切换',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '语言',
  },

  vite: {
    server: {
      allowedHosts: ['h.nyaa.host', 'h.hony-wen.com'],
    },
  },
})
