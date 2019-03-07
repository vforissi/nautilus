import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Bootstrap 
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// configuration of Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
  apiKey: "AIzaSyCGNeHAtodHUf7wxR5QN5pwpAwep77-izA",
  authDomain: "nautilus-8c408.firebaseapp.com",
  databaseURL: "https://nautilus-8c408.firebaseio.com",
  projectId: "nautilus-8c408",
  storageBucket: "nautilus-8c408.appspot.com",
  messagingSenderId: "765743131396"
};
firebase.initializeApp(config);

Vue.config.productionTip = false

const app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
