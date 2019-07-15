var sVer = chrome.runtime.getManifest().version,
  sChangelog =
    '<h3 id="changelog">What\'s new in Version </li>' + sVer + '</h3>' +
    '<ul>' +
      '<li>Added Text Clips tab</li>' +
      '<li>Added ability to insert text clip into contentEditable fields (v9.5.3)</li>' +
      '<li>Optimized import functions</li>' +
      '<li>Fixed text clip issue if title contains spaces (v9.5.3)</li>' +
      '<li>Fixed text clip JavaScript errors (v9.5.3)</li>' +
      '<li>Fixed broken wizard infobar on some sites (v9.5.6)</li>' +
      '<li>Fixed not able to save updated password values (v9.5.6)</li>' +
      '<li>Fixed error messaging on Form Fields tab (v9.5.6)</li>' +
    '</ul>' +
    '<h4><a href="changelog.txt" target="_blank">Version History</a> &raquo;</h4>';
