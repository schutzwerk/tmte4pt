export class Connector {

  key;
  displayName;
  name;
  genericTypeId;
  typeId;
  handleX;
  handleY;
  sourcePort;
  targetPort;
  sourceGuid;
  sourceX;
  sourceY;
  targetGuid;
  targetX;
  targetY;

  constructor(obj, displayName, name, genericTypeId, typeId) {
    if (obj === undefined) {
      this.key = '';
      this.displayName = '';
      this.name = '';
      this.genericTypeId = '';
      this.typeId = '';
    } else if (typeof (obj) === 'object' && name === undefined) {
      this.key = obj.key;
      this.displayName = obj.displayName;
      this.name = obj.name;
      this.genericTypeId = obj.genericTypeId;
      this.typeId = obj.typeId;
      this.handleX = obj.handleX;
      this.handleY = obj.handleY;
      this.sourcePort = obj.sourcePort;
      this.targetPort = obj.targetPort;
      this.sourceGuid = obj.sourceGuid;
      this.sourceX = obj.sourceX;
      this.sourceY = obj.sourceY;
      this.targetGuid = obj.targetGuid;
      this.targetX = obj.targetX;
      this.targetY = obj.targetY;
      return;
    } else {
      this.key = obj;
      this.displayName = displayName;
      this.name = name;
      this.genericTypeId = genericTypeId;
      this.typeId = typeId;
    }
    this.handleX = '';
    this.handleY = '';
    this.sourcePort = '';
    this.targetPort = '';
    this.sourceGuid = '';
    this.sourceX = -1;
    this.sourceY = -1;
    this.targetGuid = '';
    this.targetX = -1;
    this.targetY = -1;
  }

}
