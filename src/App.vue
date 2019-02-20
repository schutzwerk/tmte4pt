<template>
  <div id="app">
    <mw-navbar></mw-navbar>
    <router-view/>
  </div>
</template>

<script>
import MwNavbar from './components/Navbar';
import {DummyGenerator} from './classes/DummyGenerator';
import {State} from './classes/definition/State'

window.State = new State();
window.State.threats = DummyGenerator.generateThreats();
window.State.threatTypes = DummyGenerator.generateThreatTypes();

export default {
  name: 'App',
  components: { MwNavbar }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
