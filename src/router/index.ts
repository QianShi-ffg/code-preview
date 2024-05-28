import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

// 懒加载
// const moduleFiles = import.meta.glob('../components/*.vue');
// 获取components中所有路由
// const arr = Object.keys(moduleFiles).map((item: any) => {
//   const obj = {
//     name: item.replace('../components/', '').slice(0, -4),
//     path: `/demoDetail/${item.replace('../components', '').slice(0, -4)}`,
//     component: moduleFiles[item],
//   };
//   return obj;
// });

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('../home.vue'),
  },
  {
    name: 'demoShow',
    path: '/demoShow',
    component: () => import('../views/demoDetail.vue'),
    children: [
    ]
  },
  {
    name: 'demoDetail',
    path: '/demoDetail',
    component: () => import('../views/demoDetail.vue'),
    children: [
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  console.log(to, from)
  import('../views/demoDetail.vue');
  next();
});

export default router;
