chrome.contextMenus.create({
  title: 'Save to Downloads...', 
  contexts: ['image'], 
  onclick: download
})

function download(info) {
  console.log('I copy the image to the Downloads folder...')
  const url = info.srcUrl
  chrome.downloads.download({ url: url, saveAs: false })
  console.log('download', info)
  console.log('Done!')
}
