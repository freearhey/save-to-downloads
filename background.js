// Problems: http://stackoverflow.com/questions/14033588/javascript-click-method-only-works-once-in-chrome-extension
function _anchorDownloader(url, filename) {
  var timeout = 500;
  return 'javascript:\'<!doctype html><html>'+
    '<head></head>' +
    '<script>' +
      'function initDownload() {'+
        'var el = document.getElementById("anchor");'+
        'el.click();' +
        'setTimeout(function() { window.close(); }, ' + timeout + ');' +
      '}'+
    '</script>' +
    '<body onload="initDownload()">' +
      '<a id="anchor" href="' + url + '" download="'+ filename + '"></a>'+
    '</body>' +
    '</html>\'';
};
 
// A generic onclick callback function.
function downloadResource(info, tab) {
  var url = info['srcUrl'];
  console.log("url: " + url);
  var filename = url.replace(/\\/g,'/').replace(/.*\//, '').split('?')[0]
  if (chrome.downloads) {
    console.log(filename)
    chrome.downloads.download({ url: url, filename: filename, saveAs: false });
  } else {
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    chrome.tabs.create( { 'url' : _anchorDownloader( url, filename ), 'active' : false  } );
  }
}

// Register the contextual menu
chrome.contextMenus.create({"title": "Save to Downloads…", "contexts":["image"], "onclick": downloadResource});