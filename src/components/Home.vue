<template>
  <div id="home">
    <br/>
    <b-container>
      <h3>Load the files then switch to the according Tab</h3>
      <br/>

      <div class="custom-file">
        <div class="custom-file-report">
          <b-form-file v-model="reportFile" @change="onReportFileChange" :state="reportFileValid"
                       placeholder="First: Select the generated report file..." accept=".html, .htm"></b-form-file>
        </div>
        <b-button variant="primary" @click="loadReportFile">
          Load Report
        </b-button>
      </div>

      <br/>
      <br/>

      <div class="custom-file">
        <div class="custom-file-save">
          <b-form-file v-model="saveFile" @change="onSaveFileChange" :state="saveFileValid"
                       placeholder="Second: Select the MS Threat Modelling Tool 2016 save file..." accept=".tm7"></b-form-file>
        </div>
        <b-button variant="primary" @click="loadSaveFile">
          Load Save File
        </b-button>
      </div>

      <br/>
      <br/>

      <div class="custom-file">
        <div class="custom-file-json">
          <b-form-file v-model="jsonFile" @change="onJsonFileChange" :state="jsonFileValid"
                       placeholder="Select the json save file..." accept=".json, .txt"></b-form-file>
        </div>
        <b-button variant="primary" @click="loadJsonFile">
          Load Json File
        </b-button>
      </div>

      <br/>
      <br/>
      <br/>

      <div class="clearfix">
        <b-button to="/systemoverview" variant="link" class="float-left">
          <b-img v-if="state.reportImage" :src="state.reportImage" class="file-info" alt="Image from Report"></b-img>
        </b-button>
        <b-button to="/threatTypes" variant="link" class="float-right">
          <b-card v-if="state.manifest.name" class="file-info card-manifest" title="Save File Template" tag="article">
            <div class="card-text">
              <p><b>Name:</b> {{ state.manifest.name }}</p>
              <p><b>Author:</b> {{ state.manifest.author }}</p>
              <p><b>Version:</b> {{ state.manifest.version }}</p>
            </div>
          </b-card>
        </b-button>
      </div>

      <b-form-textarea id="textarea1" v-if="debugText" v-model="debugText" placeholder="Debug info" :rows="3">
      </b-form-textarea>

    </b-container>
  </div>
</template>

<script>
import {ReportFileParser} from '../classes/ReportFileParser';
import {TMTSaveFileParser} from '../classes/TMTSaveFileParser';
import {ThreatsModifier} from '../classes/ThreatsModifier';

export default {
  name: 'MwHome',
  data() {
    return {
      debugText: '',
      saveFile: null,
      saveFileValid: null,
      reportFile: null,
      reportFileValid: null,
      jsonFile: null,
      jsonFileValid: null,
      state: window.State
    };
  },

  methods: {
    loadReportFile() {
      this.reportFileValid = false;
      if (!this.reportFile) {
        return;
      }

      let reader = new FileReader();
      reader.onload = (e) => {
        // noinspection JSUnresolvedVariable
        let contents = e.target.result;
        this.parseReportFile(contents);
      };

      reader.readAsText(this.reportFile);
    },

    parseReportFile(fileText) {
      let htmlDoc = ReportFileParser.getHtmlDocFromText(fileText);
      window.State.threats = ReportFileParser.getThreats(htmlDoc);
      window.State.reportImage = ReportFileParser.getMainImage(htmlDoc);

      this.reportFileValid = true;
    },

    loadSaveFile() {
      this.saveFileValid = false;
      if (!this.saveFile) {
        return;
      }

      let reader = new FileReader();
      reader.onload = (e) => {
        // noinspection JSUnresolvedVariable
        let contents = e.target.result;
        this.parseSaveFile(contents);
      };

      reader.readAsText(this.saveFile);
    },

    parseSaveFile(fileText) {
      let xmlDoc = TMTSaveFileParser.getXmlDocFromText(fileText);

      window.State.manifest = TMTSaveFileParser.getManifest(xmlDoc);
      window.State.stencils = TMTSaveFileParser.getStencils(xmlDoc);
      window.State.connectors = TMTSaveFileParser.getConnectors(xmlDoc);
      window.State.threatProperties = TMTSaveFileParser.getThreatProperties(xmlDoc);
      let threatCategories = TMTSaveFileParser.getThreatCategories(xmlDoc);
      window.State.threatTypes = TMTSaveFileParser.getThreatTypes(xmlDoc, threatCategories);

      ThreatsModifier.assignDefaultValues(window.State.threats, window.State.threatTypes);

      this.saveFileValid = true;
    },

    loadJsonFile() {
      this.jsonFileValid = false;
      if (!this.jsonFile) {
        return;
      }

      let reader = new FileReader();
      reader.onload = (e) => {
        // noinspection JSUnresolvedVariable
        let contents = e.target.result;
        let state = JSON.parse(contents);
        window.State.setFromJson(state);
        this.jsonFileValid = true;
      };

      reader.readAsText(this.jsonFile);
    },

    onReportFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.reportFile = files[0];
    },

    onSaveFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.saveFile = files[0];
    },

    onJsonFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.jsonFile = files[0];
    }
  }
};
</script>

<style>
.custom-file-save {
  width: calc(100% - 143px);
  display: inline-block;
  margin-right: 5px;
}
.custom-file-report {
  width: calc(100% - 143px);
  display: inline-block;
  margin-right: 25px;
}
.custom-file-json {
  width: calc(100% - 140px);
  display: inline-block;
  margin-right: 5px;
}
.file-info {
  width: 400px;
  color: initial;
}
.card-manifest p {
  text-align: left;
}
</style>
