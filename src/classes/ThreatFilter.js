export class ThreatFilter {

  static doesFilterApplyOnThreat(filter, threat, fields) {
    if (!filter) {
      return true;
    }

    if (filter.indexOf('=') === -1) {
      return this.defaultFilter(threat, filter);
    } else {
      if (filter.indexOf('&') === -1) {
        return this.filterKeyValue(threat, filter, fields);
      } else {
        return this.filterQuery(threat, filter);
      }
    }
  }

  static defaultFilter(item, filter) {
    for (let val of Object.values(item)) {
      if (!val || typeof (val) === 'object') {
        continue;
      }
      if (typeof (val) === 'number') {
        val = String(val);
      }
      if (val.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
        return true;
      }
    }

    return false;
  }

  static filterQuery(item, filter) {
    let queryParts = filter.split('&');
    for (let queryPart of queryParts) {
      if (queryPart.indexOf('=') === -1) {
        continue;
      }
      if (!this.filterKeyValue(item, queryPart)) {
        return false;
      }
    }

    return true;
  }

  static filterKeyValue(item, search, fields) {
    let filterParts = search.split('=');
    let key = filterParts[0].toLowerCase();
    let val = item[key];

    if (!val) {
      for (let field of fields) {
        if (key === field.label.toLowerCase()) {
          key = field.key;
          val = item[key];
        }
      }
    }

    if (!val || typeof (val) === 'object') {
      return false;
    }
    if (typeof (val) === 'number') {
      val = String(val);
    }

    return val.toLowerCase().indexOf(filterParts[1].toLowerCase()) > -1;
  }

}
