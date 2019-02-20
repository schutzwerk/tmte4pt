import {Manifest} from './definition/Manifest';
import {Stencil} from './definition/Stencil';
import {Connector} from './definition/Connector';
import {ThreatType} from './definition/ThreatType';
import {ThreatCategory} from './definition/ThreatCategory';
import {ThreatScoresCalculator} from './ThreatScoresCalculator';

export class TMTSaveFileParser {

  static getXmlDocFromText(fileText) {
    let parser = new DOMParser();
    return parser.parseFromString(fileText, 'text/xml');
  }

  static getManifest(xmlDoc) {
    let manifestElement = xmlDoc.getElementsByTagName('a:Manifest');
    let manifestNodes = manifestElement[0].childNodes;

    return new Manifest(manifestNodes[0].textContent, manifestNodes[1].textContent, manifestNodes[2].textContent, manifestNodes[3].textContent);
  }

  static getStencils(xmlDoc) {
    let bordersElement = xmlDoc.getElementsByTagName('Borders');
    let stencilElements = bordersElement[0].childNodes;

    let stencils = [];

    for (let i = 0; i < stencilElements.length; i++) {
      let stencilProperties = stencilElements[i].childNodes[1].childNodes[2].childNodes;
      let stencil = new Stencil(stencilElements[i].childNodes[0].textContent,
        stencilProperties[0].childNodes[0].textContent,
        stencilProperties[1].childNodes[2].textContent,
        stencilElements[i].childNodes[1].childNodes[0].textContent,
        stencilElements[i].childNodes[1].childNodes[3].textContent);

      stencil.height = stencilElements[i].childNodes[1].childNodes[4].textContent;
      stencil.left = stencilElements[i].childNodes[1].childNodes[5].textContent;
      stencil.top = stencilElements[i].childNodes[1].childNodes[8].textContent;
      stencil.width = stencilElements[i].childNodes[1].childNodes[9].textContent;

      stencils.push(stencil);
    }

    return stencils;
  }

  static getConnectors(xmlDoc) {
    let linesElement = xmlDoc.getElementsByTagName('Lines');
    let connectorElements = linesElement[0].childNodes;

    let connectors = [];

    for (let i = 0; i < connectorElements.length; i++) {
      let connectorValues = connectorElements[i].childNodes[1].childNodes;
      let connectorProperties = connectorValues[2].childNodes;
      let connector = new Connector(
        connectorElements[i].childNodes[0].textContent,
        connectorProperties[0].childNodes[0].textContent,
        connectorProperties[1].childNodes[2].textContent,
        connectorValues[0].textContent,
        connectorValues[3].textContent);
      connector.handleX = connectorValues[4].textContent;
      connector.handleY = connectorValues[5].textContent;
      connector.sourcePort = connectorValues[6].textContent;
      connector.targetPort = connectorValues[7].textContent;
      connector.sourceGuid = connectorValues[8].textContent;
      connector.sourceX = connectorValues[9].textContent;
      connector.sourceY = connectorValues[10].textContent;
      connector.targetGuid = connectorValues[11].textContent;
      connector.targetX = connectorValues[12].textContent;
      connector.targetY = connectorValues[13].textContent;

      connectors.push(connector);
    }

    return connectors;
  }

  static getThreatProperties(xmlDoc) {
    let threatProperties = [];

    let threatMetaData = xmlDoc.getElementsByTagName('a:ThreatMetaData')[0];
    let propMetaData = threatMetaData.getElementsByTagName('PropertiesMetaData')[0];
    let threatMetaDatumElementsList = propMetaData.getElementsByTagName('ThreatMetaDatum');

    for (let threatMetaDatum of threatMetaDatumElementsList) {
      let threatMetaDatumChilds = threatMetaDatum.childNodes;
      let threatProp = {
        id: threatMetaDatumChilds[4].textContent,
        name: threatMetaDatumChilds[0].textContent,
        label: threatMetaDatumChilds[1].textContent,
        values: []
      };

      let values = threatMetaDatumChilds[3].childNodes;
      if (values.length > 0 && !!values[0].textContent) {
        for (let value of values) {
          threatProp.values.push(value.textContent);
        }
      }
      threatProperties.push(threatProp);
    }

    return threatProperties;
  }

  static getThreatCategories(xmlDoc) {
    let threatCategories = [];

    let threatCategoryElementsList = xmlDoc.getElementsByTagName('a:ThreatCategory');
    for (let threatCategoryElement of threatCategoryElementsList) {
      let categoryChilds = threatCategoryElement.childNodes;
      let threatCategory = new ThreatCategory(
        categoryChilds[1].textContent,
        categoryChilds[3].textContent,
        categoryChilds[4].textContent);
      threatCategories.push(threatCategory);
    }

    return threatCategories;
  }

  static getThreatTypes(xmlDoc, threatCategories) {
    let threatTypes = [];
    let threatTypeElementsList = xmlDoc.getElementsByTagName('a:ThreatType');

    for (let threatTypeElement of threatTypeElementsList) {
      let typeChilds = threatTypeElement.childNodes;
      let threatCategory = threatCategories.find((category) => { return category.id === typeChilds[1].textContent }).name;

      let threatType = new ThreatType(
        typeChilds[4].textContent.trim(),
        typeChilds[7].textContent.trim(),
        threatCategory.trim(),
        typeChilds[2].textContent.trim());

      for (let threatMetaDatum of typeChilds[5].childNodes) {
        let threatMetaChilds = threatMetaDatum.childNodes;
        if (threatMetaChilds[1].textContent === 'Description' && !!threatMetaChilds[3].firstChild.textContent) {
          threatType.description = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === 'ccfc879a-6ddf-4494-858f-25f8c96c56a3') { // Attack method
          threatType.attackMethod = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === '462c0a77-4e88-408a-af77-767411136a58') { // Recommendation
          threatType.recommendation = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === '740efc8e-d925-4275-817d-2a2876d94233') { // AV
          threatType.av = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === '52972c84-ddc3-4476-b005-4ea216a635fc') { // AC
          threatType.ac = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === '3fb3ee45-5512-4200-ad48-51f7c1f0dc31') { // Au
          threatType.au = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === 'ba2811c1-34ae-424b-86b1-18f21e8e025c') { // C
          threatType.c = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === '883012a1-d7dd-417c-92b4-20c3e2642c43') { // I
          threatType.i = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === '2695693d-1bc5-4ec4-a354-64af9cf59eeb') { // A
          threatType.a = threatMetaChilds[3].firstChild.textContent;
        } else if (threatMetaChilds[4].textContent === 'aab16a49-3caf-4973-91e5-8b746f1e3f5c') { // CDP
          threatType.cdp = threatMetaChilds[3].firstChild.textContent;
        }
      }

      ThreatScoresCalculator.calcCvss2ForThreat(threatType);
      threatTypes.push(threatType);
    }

    return threatTypes;
  }

}
