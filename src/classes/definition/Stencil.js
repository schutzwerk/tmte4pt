export class Stencil {

  key;
  displayName;
  name;
  genericTypeId;
  typeId;
  left;
  top;
  width;
  height;
  constructor(obj, displayName, name, genericTypeId, typeId) {
    if (obj === undefined) {
      this.key = '';
      this.displayName = '';
      this.name = '';
      this.genericTypeId = '';
      this.typeId = '';
    } else if (typeof (obj) === 'object' && displayName === undefined) {
      this.key = obj.key;
      this.displayName = obj.displayName;
      this.name = obj.name;
      this.genericTypeId = obj.genericTypeId;
      this.typeId = obj.typeId;
      this.left = obj.left;
      this.top = obj.top;
      this.width = obj.width;
      this.height = obj.height;
      return;
    } else {
      this.key = obj;
      this.displayName = displayName;
      this.name = name;
      this.genericTypeId = genericTypeId;
      this.typeId = typeId;
    }

    this.left = -1;
    this.top = -1;
    this.width = -1;
    this.height = -1;
  }

}
