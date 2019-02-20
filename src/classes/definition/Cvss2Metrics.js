export class Cvss2Metrics {

  av;
  ac;
  au;
  c;
  i;
  a;
  cdp;
  overallScore;
  baseScore;
  impactScore;
  exploitabilitySubScore;

  constructor(obj, ac, au, c, i, a) {
    if (obj === undefined) {
      this.av = '';
      this.ac = '';
      this.au = '';
      this.c = '';
      this.i = '';
      this.a = '';
      this.cdp = '';
    } else if (typeof (obj) === 'object' && ac === undefined) {
      this.setCvss2(obj);
      return;
    } else {
      this.av = obj;
      this.ac = ac;
      this.au = au;
      this.c = c;
      this.i = i;
      this.a = a;
    }

    this.cdp = '';
    this.overallScore = 0;
    this.baseScore = 0;
    this.impactScore = 0;
    this.exploitabilitySubScore = 0;
  }

  isBaseValid() {
    return !!this.av && !!this.ac && !!this.au && !!this.c && !!this.i && !!this.a;
  }

  getVector() { // AV:A/AC:H/Au:N/C:N/I:C/A:C/E:F/RL:ND/RC:ND
    let vector = 'AV:' + this.av.toUpperCase() + '/AC:' + this.ac.toUpperCase() + '/Au:' + this.au.toUpperCase() +
        '/C:' + this.c.toUpperCase() + '/I:' + this.i.toUpperCase() + '/A:' + this.a.toUpperCase();
    if (this.cdp) {
      vector += '/CDP:' + this.cdp.toUpperCase();
    }

    return vector;
  }

  setCvss2(obj) {
    this.av = obj.av;
    this.ac = obj.ac;
    this.au = obj.au;
    this.c = obj.c;
    this.i = obj.i;
    this.a = obj.a;
    this.cdp = obj.cdp;
    this.overallScore = obj.overallScore;
    this.baseScore = obj.baseScore;
    this.impactScore = obj.impactScore;
    this.exploitabilitySubScore = obj.exploitabilitySubScore;
  }

  setPartialCvss2(obj) {
    if (obj.av) {
      this.av = obj.av;
    }
    if (obj.ac) {
      this.ac = obj.ac;
    }
    if (obj.au) {
      this.au = obj.au;
    }
    if (obj.c) {
      this.c = obj.c;
    }
    if (obj.i) {
      this.i = obj.i;
    }
    if (obj.a) {
      this.a = obj.a;
    }
    if (obj.cdp) {
      this.cdp = obj.cdp;
    }
    this.overallScore = 0;
    this.baseScore = 0;
    this.impactScore = 0;
    this.exploitabilitySubScore = 0;
  }

}
