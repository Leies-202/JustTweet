function onClicked(tab) {
  var prefix = ' » '
  var url = 'https://mk.lei202.com/share?'
    + 'text=' + encodeURIComponent(prefix) + encodeURIComponent(tab.title)
    + '&url=' + encodeURIComponent(tab.url);
  var w = 630;
  var h = 810;
  var x = (screen.width - w) / 2;
  var y = (screen.height - h) / 2;
  window.open(url, null,
      'left='+x+',top='+y+',width='+w+',height='+h
      +',status=no');
}

chrome.browserAction.onClicked.addListener(onClicked);

// vim:set ts=8 sts=2 sw=2 tw=0 et:
