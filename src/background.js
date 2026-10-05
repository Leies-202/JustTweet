async function onClicked(tab) {
  if (!tab.url) return;

  const url = 'https://mk.lei202.com/share?'
    + 'text=' + encodeURIComponent(' » ' + (tab.title || ''))
    + '&url=' + encodeURIComponent(tab.url);
  try {
    const source = await chrome.windows.get(tab.windowId);
    const width = Math.min(630, source.width);
    const height = Math.min(810, source.height);
    await chrome.windows.create({
      url,
      type: 'popup',
      width,
      height,
      left: Math.round(source.left + (source.width - width) / 2),
      top: Math.round(source.top + (source.height - height) / 2),
      focused: true
    });
  } catch (error) {
    console.error('Could not open the Leisskey share window:', error);
  }
}

chrome.action.onClicked.addListener(onClicked);
