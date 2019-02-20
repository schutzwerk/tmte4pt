<template>
  <div id="threatTypes">
    <h1>Overview of all Threat Types</h1>

    <cvss2-table :fields="fields" :use-items="state.threatTypes" :table-properties="state.threatTypesTableProperties">
      <template slot="applyButton">
        <b-col md="3">
          <b-button @click="applyThreatTypes" variant="primary" title="Apply the changes to all threats">
            Apply to all Threats</b-button><b-badge style="padding-top: 0.7rem; padding-bottom: 0.7rem;" variant="success" v-if="applySuccess">&#10004;</b-badge>
        </b-col>
      </template>
        <template slot="infoPart" slot-scope="data">
          <p :id="'exPopover' + data.item.id" class="cursor-pointer">More</p>
          <b-popover slot="infoPart" :target="'exPopover' + data.item.id" triggers="hover click" placement="right">
            <template slot="title">More Information about the Threat</template>
            <p><b>ID:</b> <span v-on:click="showThreatTypeThreats(data.item.id)" class="cursor-pointer btn-link">{{ data.item.id }}</span></p>
            <p><b>Description:</b> {{ data.item.description }}</p>
            <p><b>AttackMethod:</b> {{ data.item.attackMethod }}</p>
            <p><b>Recommendation:</b> {{ data.item.recommendation }}</p>
          </b-popover>
        </template>
    </cvss2-table>

  </div>
</template>

<script>
import Cvss2Table from './Cvss2Table';
import {ThreatsModifier} from '../classes/ThreatsModifier';

export default {
  name: 'MwThreatTypes',
  components: {Cvss2Table},
  data() {
    return {
      state: window.State,
      fields: [
        { key: 'shortTitle', label: 'Title', sortable: true, 'class': 'titleWidth' },
        { key: 'category', label: 'Category', sortable: true, 'class': 'categoryWidth' },
        { key: 'info', label: 'Info' },
        { key: 'av', label: 'AV', sortable: true },
        { key: 'ac', label: 'AC', sortable: true },
        { key: 'au', label: 'Au', sortable: true },
        { key: 'c', label: 'C', sortable: true },
        { key: 'i', label: 'I', sortable: true },
        { key: 'a', label: 'A', sortable: true },
        { key: 'cdp', label: 'CDP', sortable: true },
        { key: 'overallScore', label: 'CVSS2', sortable: true }
      ],
      applySuccess: false
    };
  },
  methods: {
    applyThreatTypes() {
      ThreatsModifier.assignDefaultValues(window.State.threats, window.State.threatTypes);
      this.applySuccess = true;
      setTimeout(() => {
        this.applySuccess = false;
      }, 3000);
    },
    showThreatTypeThreats(threatTypeId) {
      this.state.allThreatsTableProperties.filter = threatTypeId;
      this.$router.push('allThreats');
    }
  }
};
</script>

<style>

</style>
