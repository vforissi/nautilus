import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase/app';
import 'firebase/auth';
  
//Adm,  
//Values, Identity, Worldview,
import Gate from './views/Gate.vue'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Invite from './views/Invite.vue'

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
      path: '/gate',
      name: 'gate',
      component: Gate
    },
    {
      path: '/invite',
      name: 'invite',
      component: Invite,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile/:id?',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/gate');
  else if (!requiresAuth && currentUser) next('/')
  else next();
});

export default router;
