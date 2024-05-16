chrome.contextMenus.create({
  title: 'Save to Downloads...',
  id: 'parent',
  contexts: ['image']
})

chrome.contextMenus.onClicked.addListener(download)

function download(info) {
  const url = info.srcUrl
  chrome.downloads.download({ url: url, saveAs: false })
}
