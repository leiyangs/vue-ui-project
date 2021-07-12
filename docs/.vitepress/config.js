module.exports = {
  title: "Vue3 UI库",// 网站标题
  description: '基于vue3的UI库', //网站描述
  base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
  // lang: 'en-US', //语言
  repo: 'vuejs/vitepress',
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',//图片放在public文件夹下
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    //   头部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about/' },
    ],
    //   侧边导航
    sidebar: [
      { text: 'Button 按钮', link: '/button/' },
      { text: 'Icon 图标', link: '/icon/' },
    ]
  }
}