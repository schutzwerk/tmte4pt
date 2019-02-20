import {Threat} from './definition/Threat';

export class ReportFileParser {

  static getHtmlDocFromText(fileText) {
    let parser = new DOMParser();
    return parser.parseFromString(fileText, 'text/html');
  }

  static getMainImage(htmlDoc) {
    let image = htmlDoc.getElementsByTagName('img')[0];
    return image.src;
  }

  static getThreats(htmlDoc) {
    let threats = [];
    let interaction = '';
    let correctionPositions = [];
    let body = htmlDoc.getElementsByTagName('body')[0].childNodes;
    for (let i = 0; i < body.length; i++) {
      let inter = this._getInteraction(body[i]);
      if (inter) {
        interaction = inter;
        continue;
      }

      if (body[i].className.trim().toLowerCase() === 'threat') {
        let threat = this._parseThreatElement(body[i]);
        threat.interaction = interaction;

        threats.push(threat);

        if (!threat.source || !threat.target) {
          correctionPositions.push(threats.length - 1);
        } else if (correctionPositions.length !== 0) {
          for (let pos of correctionPositions) {
            threats[pos].source = threat.source;
            threats[pos].target = threat.target;
          }
          correctionPositions = [];
        }
      }
    }

    return threats;
  }

  static _getInteraction(bodyElement) {
    if (bodyElement.nodeName.toLowerCase() === 'h3') {
      if (bodyElement.textContent.trim().startsWith('Interaction:')) {
        return bodyElement.textContent.trim().substring(13);
      }
    }
  }

  static _parseThreatElement(bodyElement) {
    let threat = new Threat();
    let headlineParts = bodyElement.childNodes[0].childNodes[0].textContent.trim().split(/(\d*\.\s)/);
    threat.id = headlineParts[1].replace('.', '').trim();
    threat.name = headlineParts[2].trim();
    let threatTableRows = bodyElement.childNodes[1].childNodes[0].childNodes;

    for (let threatTableRow of threatTableRows) {
      if (!threat.category && threatTableRow.childNodes[0].childNodes[0].textContent === 'Category:') {
        threat.category = threatTableRow.childNodes[1].textContent.trim();
      } else if (!threat.description && threatTableRow.childNodes[0].childNodes[0].textContent === 'Description:') {
        threat.description = threatTableRow.childNodes[1].textContent.trim();
      } else if (!threat.source && threatTableRow.childNodes[0].childNodes[0].textContent === 'Source:') {
        threat.source = threatTableRow.childNodes[1].textContent.trim();
      } else if (!threat.target && threatTableRow.childNodes[0].childNodes[0].textContent === 'Target:') {
        threat.target = threatTableRow.childNodes[1].textContent.trim();
      }
    }

    return threat;
  }

}
