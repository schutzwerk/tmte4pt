import {Cvss2Metrics} from './Cvss2Metrics';

export class Threat extends Cvss2Metrics {

  id;
  name;
  category;
  description;
  interaction;
  source;
  target;
  threatTypeId;

  constructor(obj, name, category, description) {
    if (obj === undefined) {
      super();
      this.id = -1;
      this.name = '';
      this.category = '';
      this.description = '';
    } else if (typeof (obj) === 'object' && name === undefined) {
      super(obj);
      this.id = obj.id;
      this.name = obj.name;
      this.category = obj.category;
      this.description = obj.description;
      this.interaction = obj.interaction;
      this.source = obj.source;
      this.target = obj.target;
      this.threatTypeId = obj.threatTypeId;
      return;
    } else {
      super();
      this.id = obj;
      this.name = name;
      this.category = category;
      this.description = description;
    }

    this.interaction = '';
    this.source = '';
    this.target = '';
    this.threatTypeId = '';
  }

}
