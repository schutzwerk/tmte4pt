export class ThreatsModifier {

  static assignDefaultValues(threats, threatTypes) {
    if (threats.length === 0 || threatTypes.length === 0) {
      return;
    }

    let usedThreatTypes = [];

    for (let threat of threats) {
      for (let threatType of threatTypes) {
        if (this.threatHasThreatType(threat.name.toLowerCase(), threatType)) {
          threat.threatTypeId = threatType.id;
          this.setUsedThreatType(usedThreatTypes, threatType.id);
          threat.setCvss2(threatType);
          break;
        }
      }
    }

    this.clearThreatTypesOfUnused(threatTypes, usedThreatTypes);
  }

  static threatHasThreatType(threatName, threatType) {
    let twoPartsMatch = threatType.shortTitleParts.length >= 2 &&
        threatName.indexOf(threatType.shortTitleParts[0].toLowerCase()) !== -1 &&
        threatName.indexOf(threatType.shortTitleParts[1].toLowerCase()) !== -1;

    let onePartMatch = threatType.shortTitleParts.length === 1 &&
        threatName.indexOf(threatType.shortTitleParts[0].toLowerCase()) !== -1;

    let directMatch = threatName.indexOf(threatType.shortTitle.toLowerCase()) !== -1;

    return twoPartsMatch || onePartMatch || directMatch;
  }

  static setUsedThreatType(usedThreatTypes, id) {
    if (usedThreatTypes.indexOf(id) === -1) {
      usedThreatTypes.push(id);
    }
  }

  static clearThreatTypesOfUnused(threatTypes, usedThreatTypes) {
    for (let i = threatTypes.length - 1; i >= 0; i--) {
      if (usedThreatTypes.indexOf(threatTypes[i].id) === -1) {
        threatTypes.splice(i, 1);
      }
    }
  }

}
