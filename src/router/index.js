import Vue from 'vue'
import Router from 'vue-router'
import HelloMovie from '@/components/HelloMovie'
import download from '@/components/downloadPage'
import searchPage from '@/components/searchPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloMovie',
      component: HelloMovie
    },
    {
    	path: '/download',
    	component: download
    },
    {
    	path: '/searchPage',
    	component: searchPage
    }
  ]
})
