import {Manifest} from './Manifest';
import {Threat} from './Threat';
import {ThreatType} from './ThreatType';
import {Stencil} from './Stencil';
import {Connector} from './Connector';
import {TableProperties} from './TableProperties';

export class State {

  threats;
  threatTypes;
  threatProperties;
  stencils;
  connectors;
  manifest;
  saveImage;
  reportImage;
  allThreatsTableProperties;
  modifyThreatsTableProperties;
  threatTypesTableProperties;

  constructor(threats, threatTypes, threatProperties, stencils, connectors) {
    if (threats === undefined) {
      this.threats = [];
      this.threatTypes = [];
      this.threatProperties = [];
      this.stencils = [];
      this.connectors = [];
    } else {
      this.threats = threats;
      this.threatTypes = threatTypes;
      this.threatProperties = threatProperties;
      this.stencils = stencils;
      this.connectors = connectors;
    }
    this.manifest = new Manifest();
    this.saveImage = '';
    this.reportImage = '';
    this.allThreatsTableProperties = new TableProperties();
    this.modifyThreatsTableProperties = new TableProperties();
    this.threatTypesTableProperties = new TableProperties();
  }

  setThreats(value) {
    this.threats.length = 0;
    this.threats.push(...value);
  }

  setThreatTypes(value) {
    this.threatTypes.length = 0;
    this.threatTypes.push(...value);
  }

  setThreatProperties(value) {
    this.threatProperties.length = 0;
    this.threatProperties.push(...value);
  }

  setStencils(value) {
    this.stencils.length = 0;
    this.stencils.push(...value);
  }

  setConnectors(value) {
    this.connectors.length = 0;
    this.connectors.push(...value);
  }

  setManifest(value) {
    this.manifest.setManifest(value);
  }

  clear() {
    this.threats = [];
    this.threatTypes = [];
    this.threatProperties = [];
    this.stencils = [];
    this.connectors = [];
    this.manifest = new Manifest();
    this.saveImage = '';
    this.reportImage = '';
    this.allThreatsTableProperties.clear();
    this.modifyThreatsTableProperties.clear();
    this.threatTypesTableProperties.clear();
  }

  clearData() {
    this.threats = [];
    this.threatTypes = [];
    this.threatProperties = [];
    this.stencils = [];
    this.connectors = [];
    this.manifest = new Manifest();
    this.saveImage = '';
    this.reportImage = '';
  }

  clearTableProperties() {
    this.allThreatsTableProperties.clear();
    this.modifyThreatsTableProperties.clear();
    this.threatTypesTableProperties.clear();
  }

  setFromJson(obj) {
    this.setData(obj);
    this.setTableProperties(obj);
  }

  setData(obj) {
    if ((obj.threats === undefined || obj.threats.length === 0) && (obj.threatTypes === undefined || obj.threatTypes.length === 0)) {
      return;
    }

    let threats = [];
    for (let threatObj of obj.threats) {
      threats.push(new Threat(threatObj));
    }
    this.setThreats(threats);

    let threatTypes = [];
    for (let threatTypeObj of obj.threatTypes) {
      threatTypes.push(new ThreatType(threatTypeObj));
    }
    this.setThreatTypes(threatTypes);

    this.setThreatProperties(obj.threatProperties);

    let stencils = [];
    for (let stencilObj of obj.stencils) {
      stencils.push(new Stencil(stencilObj));
    }
    this.setStencils(stencils);

    let connectors = [];
    for (let connectorObj of obj.connectors) {
      connectors.push(new Connector(connectorObj));
    }
    this.setConnectors(connectors);

    this.setManifest(obj.manifest);
    this.saveImage = obj.saveImage;
    this.reportImage = obj.reportImage;

    console.log('Loaded State Data');
  }

  setTableProperties(obj) {
    if ((obj.allThreatsTableProperties === undefined || !obj.allThreatsTableProperties.filter) &&
        (obj.modifyThreatsTableProperties === undefined || !obj.modifyThreatsTableProperties.filter) &&
        (obj.threatTypesTableProperties === undefined || !obj.threatTypesTableProperties.filter)) {
      return;
    }

    this.allThreatsTableProperties.setTableProperties(obj.allThreatsTableProperties);
    this.modifyThreatsTableProperties.setTableProperties(obj.modifyThreatsTableProperties);
    this.threatTypesTableProperties.setTableProperties(obj.threatTypesTableProperties);

    console.log('Loaded TableProperties Data');
  }

}
