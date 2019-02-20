<template>
  <div id="modifyThreats">
    <h1>Modify the Threats</h1>

    <cvss2-table :fields="fields" :use-items="state.threats" :table-properties="state.modifyThreatsTableProperties">
      <template slot="applyButton" slot-scope="currentThreats">
        <b-col md="3">
          <b-row style="margin-left: calc(100%/8)">
            <!--suppress JSUnresolvedVariable -->
            <b-button @click="applyToDisplayedThreats(currentThreats)" variant="primary"
                      title="Apply the selection to all displayed threats">
              Apply to displayed Threats
            </b-button>
            <b-badge style="padding-top: 0.7rem" variant="success" v-if="applySuccess">&#10004;</b-badge>
          </b-row>
          <b-row class="cvss2FilterRow">
            <div class="cvss2Col">
              <b-badge variant="light" title="Access Vector" class="cvss2Badge cursor-pointer" @click="cvss2.av = ''">AV</b-badge>
              <b-form-radio-group buttons button-variant="outline-secondary" size="sm" class="cvss2RowElement"
                                  @change="calcCvss(cvss2)" v-model="cvss2.av"
                                  :options="cvss2Options.optionsAv"></b-form-radio-group>
            </div>
            <div class="cvss2Col">
              <b-badge variant="light" title="Access Complexity" class="cvss2Badge cursor-pointer" @click="cvss2.ac = ''">AC</b-badge>
              <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                                  @change="calcCvss(cvss2)" v-model="cvss2.ac"
                                  :options="cvss2Options.optionsAc"></b-form-radio-group>
            </div>
            <div class="cvss2Col">
              <b-badge variant="light" title="Authentication" class="cvss2Badge cursor-pointer" @click="cvss2.au = ''">Au</b-badge>
              <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                                  @change="calcCvss(cvss2)" v-model="cvss2.au"
                                  :options="cvss2Options.optionsAu"></b-form-radio-group>
            </div>
            <div class="cvss2Col">
              <b-badge variant="light" title="Confidentiality Impact" class="cvss2Badge cursor-pointer" @click="cvss2.c = ''">C</b-badge>
              <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                                  @change="calcCvss(cvss2)" v-model="cvss2.c"
                                  :options="cvss2Options.optionsC"></b-form-radio-group>
            </div>
            <div class="cvss2Col">
              <b-badge variant="light" title="Integrity Impact" class="cvss2Badge cursor-pointer" @click="cvss2.i = ''">I</b-badge>
              <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                                  @change="calcCvss(cvss2)" v-model="cvss2.i"
                                  :options="cvss2Options.optionsI"></b-form-radio-group>
            </div>
            <div class="cvss2Col">
              <b-badge variant="light" title="Availability Impact" class="cvss2Badge cursor-pointer" @click="cvss2.a = ''">A</b-badge>
              <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                                  @change="calcCvss(cvss2)" v-model="cvss2.a"
                                  :options="cvss2Options.optionsA"></b-form-radio-group>
            </div>
            <div style="width: calc(100%/6)">
              <b-badge variant="light" title="Collateral Damage Potential" class="cvss2Badge cursor-pointer" @click="cvss2.cdp = ''">CDP</b-badge>
              <b-form-radio-group buttons button-variant="outline-secondary" size="sm"
                                  @change="calcCvss(cvss2)" v-model="cvss2.cdp"
                                  :options="cvss2Options.optionsCDP"></b-form-radio-group>
            </div>
            <div style="width: calc(23%)">
              <b-badge variant="light" title="CVSS2 Score" class="cvss2Badge" style="width: 150px;">CVSS2 Score:
              </b-badge>
              <b-badge id="exPopoverScoreCvss2" variant="light" title="CVSS2 Score" class="cvss2Badge cursor-pointer" style="width: 150px;">
                {{ cvss2.overallScore }}
              </b-badge>
              <b-popover target="exPopoverScoreCvss2" triggers="hover click" placement="left">
                <template slot="title">CVSS2 Score in Detail</template>
                <p><b>Overall:</b> {{ cvss2.overallScore }}</p>
                <p><b>Base:</b> {{ cvss2.baseScore }}</p>
                <p><b>Impact:</b> {{ cvss2.impactScore }}</p>
                <p><b>Exploitability:</b> {{ cvss2.exploitabilitySubScore }}</p>
              </b-popover>
            </div>
          </b-row>
        </b-col>
      </template>
      <template slot="infoPart" slot-scope="data">
        <p :id="'exPopover' + data.item.id" class="cursor-pointer">More</p>
        <b-popover :target="'exPopover' + data.item.id" triggers="hover click" placement="right">
          <template slot="title">More Information about the Threat</template>
          <p><b>Description:</b> {{ data.item.description }}</p>
          <p><b>Interaction:</b> {{ data.item.interaction }}</p>
          <p><b>Stride Category:</b> {{ data.item.category }}</p>
          <p><b>Threat Type ID:</b> {{ data.item.threatTypeId }}</p>
        </b-popover>
      </template>
    </cvss2-table>
    <b-button @click="merge2wayFlows" class="merge2wayFlowButton" variant="primary" title="Merge Threats which have the same flow and go in both directions. e.g. ACC <-> Gateway">Merge 2-way Flows</b-button>
  </div>
</template>

<script>
import Cvss2Table from './Cvss2Table';
import {Cvss2Metrics} from '../classes/definition/Cvss2Metrics';
import {ThreatScoresCalculator} from '../classes/ThreatScoresCalculator';
import {Cvss2Options} from '../classes/Cvss2Options';

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
        {key: 'av', label: 'AV', sortable: true},
        {key: 'ac', label: 'AC', sortable: true},
        {key: 'au', label: 'Au', sortable: true},
        {key: 'c', label: 'C', sortable: true},
        {key: 'i', label: 'I', sortable: true},
        {key: 'a', label: 'A', sortable: true},
        {key: 'cdp', label: 'CDP', sortable: true},
        {key: 'overallScore', label: 'CVSS2', sortable: true}
      ],
      cvss2: new Cvss2Metrics(),
      cvss2Options: Cvss2Options,
      applySuccess: false
    };
  },
  methods: {
    applyToDisplayedThreats(items) {
      for (let threatItem of Object.values(items)) {
        for (let threat of window.State.threats) {
          if (threat.id === threatItem.id) {
            threat.setPartialCvss2(this.cvss2);
            this.calcCvss(threat);
          }
        }
      }
      this.applySuccess = true;
      setTimeout(() => {
        this.applySuccess = false;
      }, 3000);
    },
    calcCvss(item) {
      this.$nextTick(() => {
        ThreatScoresCalculator.calcCvss2ForThreat(item);
      })
    },
    merge2wayFlows() {
      let mergedThreats = [];
      let found = false;

      for (let threat of this.state.threats) {
        for (let mergedThreat of mergedThreats) {
          if (mergedThreat.threatTypeId === threat.threatTypeId && mergedThreat.interaction === threat.interaction) {
            if (mergedThreat.source === threat.target && mergedThreat.target === threat.source) {
              mergedThreat.source += ' <-> ' + threat.source;
              mergedThreat.target += ' <-> ' + threat.target;
              found = true;
              break;
            }
          }
        }
        if (found) {
          found = false;
          continue;
        }
        mergedThreats.push(threat);
      }

      this.state.setThreats(mergedThreats);
    }
  }
};
</script>

<style scoped>
  .cvss2Badge {
    width: 50px;
    font-size: 1.1rem;
    margin-right: 10px;
    height: 30px;
    padding-top: 5px;
  }
  .cvss2RowElement {
    margin-right: 10px;
  }
  .cvss2FilterRow {
    margin: 10px 0;
    width: 96vw;
    position: relative;
    z-index: 100;
  }
  .cvss2Col {
    width: calc(100% / 10);
  }
  .merge2wayFlowButton {
    float: left;
    margin: -50px 0 0 20px;
  }
</style>
