import {Cvss2Metrics} from './definition/Cvss2Metrics';
import {Cvss2Calculator} from './Cvss2Calculator';

export class ThreatScoresCalculator {

  static calcCvss2ForThreat(threat) {
    let cvss2 = new Cvss2Metrics(threat);
    if (cvss2.isBaseValid()) {
      let obj = Cvss2Calculator.vectorToObject(cvss2.getVector());
      let scores = Cvss2Calculator.computeScoresFromObject(obj);
      threat.overallScore = scores.overallScore;
      threat.baseScore = scores.baseScore;
      threat.impactScore = scores.impactScore;
      threat.exploitabilitySubScore = scores.exploitabilitySubScore;
    }
  }

}
