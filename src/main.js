// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import './css_modules/common.sass'
import './styles/dxy-ui.min.css'

Vue.config.productionTip = false

//bus 传值，因为项目小，没必要上vuex
window.BUS = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
