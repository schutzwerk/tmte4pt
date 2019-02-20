<template>
  <div id="allThreats">
    <h1>Overview of all Threats</h1>

    <cvss2-table :fields="fields" :use-items="state.threats" :table-properties="state.allThreatsTableProperties">
      <template slot="infoPart" slot-scope="data">
        <p :id="'exPopover' + data.item.id" class="cursor-pointer">More</p>
        <b-popover :target="'exPopover' + data.item.id" triggers="hover click" placement="right">
          <template slot="title">More Information about the Threat</template>
          <p><b>Description:</b> {{ data.item.description }}</p>
          <p><b>Stride Category:</b> {{ data.item.category }}</p>
          <p><b>Threat Type ID:</b><span v-on:click="showThreatTypeThreats(data.item.threatTypeId)" class="cursor-pointer btn-link">{{ data.item.threatTypeId }}</span></p>
        </b-popover>
      </template>
    </cvss2-table>

  </div>
</template>

<script>
import Cvss2Table from './Cvss2Table';

export default {
  name: 'MwAllThreats',
  components: {Cvss2Table},
  data() {
    return {
      state: window.State,
      fields: [
        { key: 'id', label: 'Id', sortable: true, 'class': 'idWidth' },
        { key: 'name', label: 'Name', sortable: true, 'class': 'nameWidth' },
        { key: 'source', label: 'Source', sortable: true, 'class': 'sourceWidth' },
        { key: 'interaction', label: 'Interaction', sortable: true, 'class': 'interactionWidth' },
        { key: 'target', label: 'Target', sortable: true, 'class': 'targetWidth' },
        { key: 'info', label: 'Info' },
        { key: 'av', label: 'AV', sortable: true },
        { key: 'ac', label: 'AC', sortable: true },
        { key: 'au', label: 'Au', sortable: true },
        { key: 'c', label: 'C', sortable: true },
        { key: 'i', label: 'I', sortable: true },
        { key: 'a', label: 'A', sortable: true },
        { key: 'cdp', label: 'CDP', sortable: true },
        { key: 'overallScore', label: 'CVSS2', sortable: true }
      ]
    };
  },
  methods: {
    showThreatTypeThreats(threatTypeId) {
      this.state.threatTypesTableProperties.filter = threatTypeId;
      this.$router.push('threattypes');
    }
  }
};
</script>

<style>

</style>
