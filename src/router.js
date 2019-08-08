import Vue from 'vue'
import Router from 'vue-router'
import IdeaGeneration from './views/IdeaGeneration.vue'
import Voting from './views/Voting.vue'
import Results from './views/Results.vue'
//import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ideageneration',
      component: IdeaGeneration,
      props: { user: '123456'}
    },
    {
      path: '/voting',
      name: 'voting',
      props: { user: '123456'},
      component: Voting
    },
    {
      path: '/results',
      name: 'results',
      component: Results
    }
    //{
      //path: '/about',
      //name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    //}
  ],
  mode: 'history'
})
