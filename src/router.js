import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase/app';
import 'firebase/auth';
import { 
  Gate,
  List,
  New,
  //Profile,
  //Adm,
  //Values, Identity, Worldview,
} from './views';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/gate',
    },
    {
      path: '/',
      redirect: '/gate',
    },
    {
      path: '/gate',
      name: 'gate',
      component: Gate
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/new',
      name: 'new',
      component: New,
      meta: {
        requiresAuth: true,
      },
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('gate');
  else if (!requiresAuth && currentUser) next('list');
  else next();
});

export default router;
