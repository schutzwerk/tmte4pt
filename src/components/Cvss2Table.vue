<template>
  <div>
    <mw-metric-info :tabIndex="tabIndex"></mw-metric-info>

  <b-container fluid>
    <b-row class="threatTypesControl">
      <slot name="applyButton" v-bind="useItemsChange"></slot>
      <b-col md="5" class="ml-auto">
        <b-form-group class="mb-0">
          <b-input-group class="filterCvss2">
            <b-form-input v-model="tableProperties.filter" placeholder="Type to filter through all columns"></b-form-input>
            <b-input-group-append>
              <b-btn :disabled="!tableProperties.filter" variant="secondary" @click="clearFilter">Clear</b-btn>
            </b-input-group-append>
            <b-input-group-append>
              <b-btn :disabled="!tableProperties.filter" variant="primary" @click="refresh">Refresh</b-btn>
            </b-input-group-append>
            <b-input-group-append>
            <div class="filterHelpDiv">
              <b-button id="filterHelp" variant="warning">?</b-button>
              <b-popover target="filterHelp" triggers="hover click" placement="rightbottom">
                <template slot="title">Filtering the table</template>
                <p>Type one or multiple words into the textfield to filter for the input through all strings in the row.</p>
                <p>It will only be checked, if the string contains the input. e.g. "ate" is in Gateway</p>
                <p>Upper- or Lowercase does NOT matter.</p>
                <p>You can use the key=value syntax to filter for a specific value in one column. e.g. "av=a" or "name=Bus".</p>
                <p>You can concat filters with "&". Each of these conditions must then be fulfilled. e.g. "c=n&i=c&a=p"</p>
                <p>"Clear" will clear the filter, "Refresh", will reload the table</p>
                <p>There is a known bug, when you filter for a value (e.g. c=p) and then change the value in the row (e.g. p to c),
                  the UI doesn't get updated and the new value will be displayed for the next entry but in the same row.
                As a workaround, click "Refresh"</p>
              </b-popover>
            </div>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="1" class="ml-auto">
        <b-form-group class="">
          <b-form-select :options="pageOptions" v-model="perPage"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="auto" class="">
        <b-pagination :total-rows="totalRowsComputed" :per-page="perPage" v-model="currentPage" class=""></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-row><b-col style="overflow: auto">
    <b-table id="cvss2Table" ref="cvss2Table" show-empty stacked="md" :fields="fields" :items="useItems" responsive
             :current-page="currentPage" :per-page="perPage" :filter="filterFunction" @filtered="onFiltered"
             :sort-by.sync="tableProperties.sortBy" :sort-desc.sync="tableProperties.desc"
    >
      <template slot="info" slot-scope="data">
        <slot name="infoPart" v-bind="data"></slot>
      </template>

      <template slot="HEAD_av" slot-scope="data">
        <div class="cursor-pointer" title="Access Vector" @click="openInfo(0)" @click.stop="">{{data.label}}</div>
      </template>
      <template slot="av" slot-scope="data">
        <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                            @change="calcCvss(data.item)" v-model="data.item.av" :options="cvss2Options.optionsAv"></b-form-radio-group>
      </template>
      <template slot="HEAD_ac" slot-scope="data">
        <div class="cursor-pointer" title="Access Complexity" @click="openInfo(1)" @click.stop="">{{data.label}}</div>
      </template>
      <template slot="ac" slot-scope="data">
        <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                            @change="calcCvss(data.item)" v-model="data.item.ac" :options="cvss2Options.optionsAc"></b-form-radio-group>
      </template>
      <template slot="HEAD_au" slot-scope="data">
        <div class="cursor-pointer" title="Authentication" @click="openInfo(2)" @click.stop="">{{data.label}}</div>
      </template>
      <template slot="au" slot-scope="data">
        <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                            @change="calcCvss(data.item)" v-model="data.item.au" :options="cvss2Options.optionsAu"></b-form-radio-group>
      </template>
      <template slot="HEAD_c" slot-scope="data">
        <div class="cursor-pointer" title="Confidentiality Impact" @click="openInfo(3)" @click.stop="">{{data.label}}</div>
      </template>
      <template slot="c" slot-scope="data">
        <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                            @change="calcCvss(data.item)" v-model="data.item.c" :options="cvss2Options.optionsC"></b-form-radio-group>
      </template>
      <template slot="HEAD_i" slot-scope="data">
        <div class="cursor-pointer" title="Integrity Impact" @click="openInfo(4)" @click.stop="">{{data.label}}</div>
      </template>
      <template slot="i" slot-scope="data">
        <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                            @change="calcCvss(data.item)" v-model="data.item.i" :options="cvss2Options.optionsI"></b-form-radio-group>
      </template>
      <template slot="HEAD_a" slot-scope="data">
        <div class="cursor-pointer" title="Availability Impact" @click="openInfo(5)" @click.stop="">{{data.label}}</div>
      </template>
      <template slot="a" slot-scope="data">
        <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                            @change="calcCvss(data.item)" v-model="data.item.a" :options="cvss2Options.optionsA"></b-form-radio-group>
      </template>
      <template slot="HEAD_cdp" slot-scope="data">
        <div class="cursor-pointer" title="Collateral Damage Potential" @click="openInfo(6)" @click.stop="">{{data.label}}</div>
      </template>
      <template slot="cdp" slot-scope="data">
        <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                            @change="calcCvss(data.item)" v-model="data.item.cdp" :options="cvss2Options.optionsCDP"></b-form-radio-group>
      </template>
      <template slot="HEAD_overallScore" slot-scope="data">
        <div class="cursor-pointer" title="Common Vulnerability Scoring System" @click="openInfo(7)" @click.stop="">{{data.label}}</div>
      </template>
      <template slot="overallScore" slot-scope="data">
        <p :id="'exPopoverScore' + data.item.id" class="cvss2OverallScore cursor-pointer" :class="cvss2ScoreClass(data.item.overallScore)">{{ data.item.overallScore }}</p>
        <p class="smallCvss2Scores">
          <span :class="cvss2ScoreClass(data.item.baseScore)">{{ data.item.baseScore }}</span> /
          <span :class="cvss2ScoreClass(data.item.impactScore)">{{ data.item.impactScore }}</span> /
          <span :class="cvss2ScoreClass(data.item.exploitabilitySubScore)">{{ data.item.exploitabilitySubScore }}</span>
        </p>
        <b-popover :target="'exPopoverScore' + data.item.id" triggers="hover click" placement="left">
          <template slot="title">CVSS2 Score in Detail</template>
          <p><b>Overall:</b> <span :class="cvss2ScoreClass(data.item.overallScore)">{{ data.item.overallScore }}</span></p>
          <p><b>Base:</b> <span :class="cvss2ScoreClass(data.item.baseScore)">{{ data.item.baseScore }}</span></p>
          <p><b>Impact:</b> <span :class="cvss2ScoreClass(data.item.impactScore)">{{ data.item.impactScore }}</span></p>
          <p><b>Exploitability:</b> <span :class="cvss2ScoreClass(data.item.exploitabilitySubScore)">{{ data.item.exploitabilitySubScore }}</span></p>
        </b-popover>
      </template>
    </b-table>
    </b-col></b-row>

    <b-row align-h="end">
      <b-col md="1" class="ml-auto"><b-button variant="light">#Rows: {{totalRowsChange}}</b-button></b-col>
      <b-col cols="auto" class="">
        <b-pagination :total-rows="totalRowsComputed" :per-page="perPage" v-model="currentPage" class=""></b-pagination>
      </b-col>
    </b-row>
  </b-container>
  </div>

</template>

<script>
import MwMetricInfo from './MetricInfo';
import {TableProperties} from '../classes/definition/TableProperties';
import {ThreatFilter} from '../classes/ThreatFilter';
import {ThreatScoresCalculator} from '../classes/ThreatScoresCalculator';
import {Cvss2Options} from '../classes/Cvss2Options';

export default {
  name: 'MwCvss2Table',
  components: {MwMetricInfo},
  props: {fields: Array, useItems: Array, tableProperties: TableProperties},
  data() {
    return {
      cvss2Options: Cvss2Options,
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 25, 50, 100 ],
      totalRowsChange: null,
      useItemsChange: null,
      tabIndex: 0
    };
  },
  methods: {
    openInfo(index) {
      let metricStyle = document.getElementById('collapse-metric-info').style;
      if (this.tabIndex === index) {
        metricStyle.display = metricStyle.display === 'none' ? 'inherit' : 'none';
      } else {
        this.tabIndex = index;
        metricStyle.display = 'inherit';
      }
    },

    onFiltered(filteredItems) {
      this.totalRowsChange = filteredItems.length;
      this.useItemsChange = filteredItems;
      this.currentPage = 1;
    },

    calcCvss(item) {
      this.$nextTick(() => {
        ThreatScoresCalculator.calcCvss2ForThreat(item);
      })
    },

    filterFunction(item) {
      let filter = this.tableProperties.filter;

      return ThreatFilter.doesFilterApplyOnThreat(filter, item, this.fields)
    },

    clearFilter() {
      // noinspection JSUnresolvedVariable
      this.tableProperties.filter = '';
    },

    refresh() {
      let temp = this.tableProperties.filter;

      this.$nextTick(() => {
        // noinspection JSUnresolvedVariable
        this.tableProperties.filter += 'Clearing#!';
        this.$nextTick(() => {
          // noinspection JSUnresolvedVariable
          this.tableProperties.filter = temp;
        });
      });
    }
  },
  computed: {
    totalRowsComputed: function () {
      if (this.totalRowsChange == null || this.totalRowsChange === undefined) {
        return this.useItems.length;
      } else {
        return this.totalRowsChange;
      }
    },
    cvss2ScoreClass: function () {
      return (score) => {
        let className = 'cvss-' + parseInt(score);
        let classObj = {};
        classObj[className] = true;

        return classObj
      };
    }
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style>
  .cursor-pointer {
    cursor: pointer;
  }
  .filterCvss2 {
    float: left;
    width: calc(100% - 55px);
  }
  .filterHelpDiv {
    margin-left: 10px;
    float: left;
  }
  .cvss2OverallScore {
    margin: 0;
  }
  .smallCvss2Scores {
    font-size: xx-small;
    margin: 0;
    padding: 0;
  }
  .cvss-0 {
    color: #00c400;
  }
  .cvss-1 {
    color: #00e020;
  }
  .cvss-2 {
    color: #00f000;
  }
  .cvss-3 {
    color: #bce600;
  }
  .cvss-4 {
    color: #edd000;
  }
  .cvss-5 {
    color: #ffcc00;
  }
  .cvss-6 {
    color: #ffa710;
  }
  .cvss-7 {
    color: #ff8620;
  }
  .cvss-8 {
    color: #ff3500;
  }
  .cvss-9 {
    color: #ff0000;
  }
  .cvss-10 {
    color: #ff0000;
  }
  .idWidth{
    width: 50px;
  }
  .nameWidth{
    width: 400px;
  }
  .sourceWidth{
    width: 200px;
  }
  .interactionWidth{
    width: 200px;
  }
  .targetWidth{
    width: 200px;
  }
  .titleWidth{
    width: 450px;
  }
  .categoryWidth{
    width: 150px;
  }
</style>
