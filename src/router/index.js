import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/homepage/do.vue'
import Parties from '../views/strany/do.vue'
import Candidates from '../views/kandidati/do.vue'
import Admin from '../views/admin/do.vue'
import About from '../views/about/do.vue'
import Polls from '../views/polls/do.vue'
import NewsList from '../views/news/list/do.vue'
import NewsDetail from '../views/news/detail/do.vue'
import PointerParty from '../views/pointer/strana/do.vue'
import PointerCandidate from '../views/pointer/kandidat/do.vue'
import PointerQA from '../views/pointer/qa/do.vue'
import PointerProgram from '../views/pointer/program/do.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/strany',
      name: 'Parties',
      component: Parties
    },
    {
      path: '/kandidati',
      name: 'Candidates',
      component: Candidates
    },
    {
      path: '/pro-kandidaty',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/strana/:tableID/volebni-program/:programID',
      name: 'PointerProgram',
      component: PointerProgram,
      props: true
    },
    {
      path: '/strana/:tableID/otazky-a-odpovedi',
      name: 'PointerQA',
      component: PointerQA,
      props: true
    },
    {
      path: '/strana/:tableID',
      name: 'PointerParty',
      component: PointerParty,
      props: true
    },
    {
      path: '/kandidat/:tableID',
      name: 'PointerCandidate',
      component: PointerCandidate,
      props: true
    },
    {
      path: '/bod/:tableName/:tableID',
      name: 'GenericPointer',
      redirect: to => {
        if (to.params.tableName === 'csu_ep_rkl') {
          return { path: '/strana/' + to.params.tableID }
        } else {
          return { path: '/kandidat/' + to.params.tableID }
        }        
      },
      props: true
    },
    {
      path: '/novinky',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/novinky/:id',
      name: 'NewsDetail',
      component: NewsDetail,
      props: true
    },
    {
      path: '/o-projektu',
      name: 'About',
      component: About
    },
    {
      path: '/volebni-pruzkumy',
      name: 'Polls',
      component: Polls
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.querySelector('header').classList.add('_processing');
  next();
})

router.afterEach((to, from) => {
  document.querySelector('header').classList.remove('_processing');
})

export default router
