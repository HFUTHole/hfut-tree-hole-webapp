// @unocss-include

export interface TNavListItem {
  title: string
  path: string
  icon: string
  badge?: string
}

export interface TNavListConfig {
  subheader: string
  list: TNavListItem[]
}

export const NavListConfig = [
  {
    subheader: 'app',
    list: [
      // {
      //   title: '主页',
      //   path: '/app/home',
      //   icon: 'i-carbon:home',
      // },
      {
        title: '树洞',
        path: '/app/treehole',
        icon: 'i-ph:tree',
        badge: '111',
      },
      {
        title: '留言墙',
        path: '/app/MessageWall',
        icon: 'i-carbon:align-box-middle-left',
      },
    ],
  },
  {
    subheader: '用户',
    list: [
      {
        title: '个人主页',
        path: '/app/user',
        icon: 'i-ri:user-5-line',
      },
    ],
  },
]

