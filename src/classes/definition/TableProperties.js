export class TableProperties {

  filter;
  sortBy;
  desc;

  constructor(obj, allThreatsSortBy, allThreatsDesc) {
    if (obj === undefined) {
      this.filter = null;
      this.sortBy = null;
      this.desc = true;
    } else if (typeof (obj) === 'object' && allThreatsSortBy === undefined) {
      this.setTableProperties(obj);
    } else {
      this.filter = obj;
      this.sortBy = allThreatsSortBy;
      this.desc = allThreatsDesc;
    }
  }

  clear() {
    this.filter = null;
    this.sortBy = null;
    this.desc = true;
  }

  setTableProperties(obj) {
    if (obj === undefined) {
      return;
    }
    this.filter = obj.filter;
    this.sortBy = obj.sortBy;
    this.desc = obj.desc;
  }

}
