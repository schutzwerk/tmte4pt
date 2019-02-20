import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home'
import About from './components/About';
import HowTo from './components/HowTo';
import AllThreats from './components/AllThreats';
import ModifyThreats from './components/ModifyThreats';
import ThreatTypes from './components/ThreatTypes';
import SystemOverview from './components/SystemOverview';

// noinspection JSUnresolvedFunction
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/howto',
      name: 'HowTo',
      component: HowTo
    },
    {
      path: '/allthreats',
      name: 'AllThreats',
      component: AllThreats
    },
    {
      path: '/modifythreats',
      name: 'ModifyThreats',
      component: ModifyThreats
    },
    {
      path: '/threattypes',
      name: 'ThreatTypes',
      component: ThreatTypes
    },
    {
      path: '/systemoverview',
      name: 'SystemOverview',
      component: SystemOverview
    }
  ]
});
