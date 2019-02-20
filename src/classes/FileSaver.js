export class FileSaver {

  static download(data, filename) {
    let file = new Blob([data], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob) { // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
      let a = document.createElement('a');
      let url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        // noinspection JSUnresolvedFunction
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

}
