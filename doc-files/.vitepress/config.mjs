import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'NyaaChat 文档',
  description: 'NyaaChat 使用文档与开发指南',

  head: [
    ['link', { rel: 'icon', href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>" }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '开始使用', link: '/guide/what-is-nyaachat' },
      { text: '角色扮演', link: '/roleplay/' },
      { text: '知识库', link: '/knowledge-base/' },
      { text: '账号系统', link: '/account/' },
      { text: '常见问题', link: '/faq' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: 'NyaaChat 是什么', link: '/guide/what-is-nyaachat' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '界面导览', link: '/guide/interface-tour' },
            { text: '配置对话模型', link: '/guide/configure-model' },
            { text: '开始第一次对话', link: '/guide/first-chat' },
          ],
        },
      ],
      '/roleplay/': [
        {
          text: '角色扮演',
          items: [
            { text: '角色扮演总览', link: '/roleplay/' },
            { text: '角色选择界面', link: '/roleplay/character-selection' },
            { text: '创建角色·基础', link: '/roleplay/create-character' },
            { text: '用户角色·你的人设', link: '/roleplay/user-role' },
            { text: '角色导入与导出', link: '/roleplay/import-export' },
            { text: '共享角色库', link: '/roleplay/shared-library' },
            { text: '角色规则·世界书', link: '/roleplay/world-info' },
            { text: '正则规则', link: '/roleplay/regex' },
            { text: '角色变量', link: '/roleplay/variables' },
          ],
        },
      ],
      '/knowledge-base/': [
        {
          text: '知识库',
          items: [
            { text: '什么是知识库', link: '/knowledge-base/' },
            { text: '前置准备', link: '/knowledge-base/prerequisites' },
            { text: '创建与管理知识库', link: '/knowledge-base/manage' },
            { text: '上传与管理文档', link: '/knowledge-base/documents' },
            { text: '绑定角色与检索注入', link: '/knowledge-base/link-to-character' },
            { text: '知识库栈额度与扩容', link: '/knowledge-base/quota' },
          ],
        },
      ],
      '/account/': [
        {
          text: '账号系统',
          items: [
            { text: '账号系统总览', link: '/account/' },
            { text: '登录与注册', link: '/account/login-register' },
            { text: '账号面板', link: '/account/profile' },
            { text: '猫粮与充值', link: '/account/catfood-recharge' },
            { text: '额度与扩容', link: '/account/quota-expand' },
            { text: '云同步', link: '/account/cloud-sync' },
          ],
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
