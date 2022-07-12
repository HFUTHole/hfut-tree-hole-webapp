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
      {
        title: '主页',
        path: '/app/home',
        icon: 'i-carbon:home',
      },
      {
        title: '树洞',
        path: '/app/treehole',
        icon: 'i-ph:tree',
        badge: '111',
      },
    ],
  },
]

