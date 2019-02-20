<template>
  <b-navbar toggleable="md" type="dark" variant="info" sticky>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">TMTe4PT</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item to="/allthreats">All Threats</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item to="/modifythreats">Modify Threats</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item to="/threattypes">ThreatTypes</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item to="/systemoverview">System Overview</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">Temp</template>
          <b-dropdown-item @click="saveTemp" title="Save the State and TableProperties temporarily">Save All to Temp</b-dropdown-item>
          <b-dropdown-item @click="loadTemp" title="Load the State and TableProperties which have been previously saved temporarily">Load from the Temp</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template slot="button-content">Clear</template>
          <b-dropdown-item @click="clearCompleteState" title="Clear State and TableProperties">Clear Data and Filter</b-dropdown-item>
          <b-dropdown-item @click="clearStateData" title="Clear State">Clear Data</b-dropdown-item>
          <b-dropdown-item @click="clearTableProperties" title="Clear TableProperties">Clear Filter</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template slot="button-content">Save</template>
          <b-dropdown-item @click="saveCompleteState" title="Save State and TableProperties to a json File">Save Data and Filter</b-dropdown-item>
          <b-dropdown-item @click="saveStateData" title="Save State to a json File">Save Data</b-dropdown-item>
          <b-dropdown-item @click="saveTableProperties" title="Save TableProperties to a json File">Save Filter</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>Help</em>
          </template>
          <b-dropdown-item to="/about">About</b-dropdown-item>
          <b-dropdown-item to="/howto">HowTo</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import {FileSaver} from '../classes/FileSaver';
import {State} from '../classes/definition/State';

let temp = new State();

export default {
  name: 'MwNavbar',
  methods: {
    clearCompleteState() {
      window.State.clear();
    },
    clearStateData() {
      window.State.clearData();
    },
    clearTableProperties() {
      window.State.clearTableProperties();
    },
    saveCompleteState() {
      FileSaver.download(JSON.stringify(window.State), 'Tmte4pt_SaveFile_DataFilter.json')
    },
    saveStateData() {
      let tempState = new State();
      tempState.setFromJson(window.State);
      tempState.clearTableProperties();
      FileSaver.download(JSON.stringify(tempState), 'Tmte4pt_SaveFile_Data.json')
    },
    saveTableProperties() {
      console.log('saving');
      let tempState = new State();
      tempState.setFromJson(window.State);
      tempState.clearData();
      console.log(JSON.stringify(tempState));
      FileSaver.download(JSON.stringify(tempState), 'Tmte4pt_SaveFile_Filter.json')
    },
    saveTemp() {
      temp.setFromJson(window.State);
    },
    loadTemp() {
      window.State.setFromJson(temp);
    }
  }
};
</script>
