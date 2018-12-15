
exports.loadImage = function(imgSrc) {
  return new Promise((resolve, reject) => {
    const imgElement = new Image()
    imgElement.onload = resolve.bind(this, imgElement)
    imgElement.src = imgSrc
  })
}

exports.fetchHTML = (url) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.onreadystatechange = function() {
      if (this.readyState == 4){
        resolve(this.responseText)
      }
    }
    req.open('GET', url, true)
    req.send()
  })
}
