export class Manifest {

  author;
  id;
  name;
  version;

  constructor(obj, id, name, version) {
    if (obj === undefined) {
      this.author = '';
      this.id = '';
      this.name = '';
      this.version = '';
    } else if (typeof (obj) === 'object' && id === undefined) {
      this.setManifest(obj);
    } else {
      this.author = obj;
      this.id = id;
      this.name = name;
      this.version = version;
    }
  }

  clear() {
    this.author = '';
    this.id = '';
    this.name = '';
    this.version = '';
  }

  setManifest(obj) {
    if (obj === undefined) {
      return;
    }
    this.author = obj.author;
    this.id = obj.id;
    this.name = obj.name;
    this.version = obj.version;
  }

}
