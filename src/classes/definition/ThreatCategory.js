export class ThreatCategory {

  id;
  name;
  shortDescription;

  constructor(id, name, shortDescription) {
    if (id === undefined) {
      this.id = '';
      this.name = '';
      this.shortDescription = '';
    } else {
      this.id = id;
      this.name = name;
      this.shortDescription = shortDescription;
    }
  }

}
