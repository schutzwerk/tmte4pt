import {Threat} from './definition/Threat';
import {ThreatType} from './definition/ThreatType';

let categories = ['Spoofing', 'Tampering', 'Repudiation', 'Information disclosure', 'Denial of service', 'Elevation of privilege'];

export class DummyGenerator {

  static generateThreats() {
    let threats = [];

    for (let i = 0; i < 41; i++) {
      let threat = new Threat('' + i, 'ThreatName' + i, categories[i % 6], 'Description' + i);
      threat.interaction = 'Interaction' + (i % 3);
      threat.source = 'Source' + (i % 7);
      threat.target = 'Target' + (i % 4);
      threat.av = 'A';
      threat.ac = 'M';
      threat.au = 'S';
      threat.c = 'P';
      threat.i = 'P';
      threat.a = 'P';
      threat.cdp = 'L';
      threat.overallScore = 5.4;
      threat.baseScore = 4.9;
      threat.impactScore = 6.4;
      threat.exploitabilitySubScore = 4.4;
      threats.push(threat);
    }

    return threats;
  }

  static generateThreatTypes() {
    let threatTypes = [];
    for (let i = 0; i < 12; i++) {
      if (i % 2 === 0) continue;
      let threatType = new ThreatType('' + i, 'ThreatName' + i, categories[i % 6], 'Description' + i);
      threatType.attackMethod = 'AttackMethod';
      threatType.recommendation = 'Recommendation';
      threatType.av = 'L';
      threatType.ac = 'M';
      threatType.au = 'N';
      threatType.c = 'N';
      threatType.i = 'P';
      threatType.a = 'C';
      threatType.cdp = 'MH';
      threatType.overallScore = 7.2;
      threatType.baseScore = 5.4;
      threatType.impactScore = 7.8;
      threatType.exploitabilitySubScore = 3.4;
      threatTypes.push(threatType);
    }

    return threatTypes;
  }

}
