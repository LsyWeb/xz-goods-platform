export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },

  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
    hideInMenu: true,
  },
  {
    name: 'goods',
    icon: 'menu',
    path: '/good',
    routes: [
      {
        name: 'list',
        path: '/good/list',
        component: './goods/list',
      },
    ],
  },
  {
    path: '/',
    redirect: '/good/list',
  },
  {
    component: './404',
  },
];
