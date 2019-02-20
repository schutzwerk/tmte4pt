import {Cvss2Metrics} from './Cvss2Metrics';

export class ThreatType extends Cvss2Metrics {

  id;
  shortTitle;
  shortTitleParts;
  category;
  description;

  attackMethod;
  recommendation;

  constructor(obj, shortTitle, category, description) {
    if (obj === undefined) {
      super();
      this.id = '';
      this.shortTitle = '';
      this.category = '';
      this.description = '';
    } else if (typeof (obj) === 'object' && shortTitle === undefined) {
      super(obj);
      this.id = obj.id;
      this.setShortTitle(obj.shortTitle);
      this.category = obj.category;
      this.description = obj.description;
      this.attackMethod = obj.attackMethod;
      this.recommendation = obj.recommendation;
      return;
    } else {
      super();
      this.id = obj;
      this.setShortTitle(shortTitle);
      this.category = category;
      this.description = description;
    }

    this.attackMethod = '';
    this.recommendation = '';
  }

  setShortTitle(value) {
    this.shortTitle = value;
    if (value.indexOf('{') !== -1) {
      this.shortTitleParts = value.split(/{.*\..*}/);
    } else {
      this.shortTitleParts = [];
    }
  }

}
