import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layouts/default.vue';
import configList from './config';

const routerList = [];
configList.forEach((item) => {
  const { path, componentName } = item;
  routerList.push({
    path,
    component: () => import(`@/views/${componentName}.vue`),
  });
});

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: routerList[0].path,
    children: [...routerList],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
