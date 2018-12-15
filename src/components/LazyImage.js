const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const declareJsComponent = require('~/declareJsComponent')

module.exports = declareJsComponent(__filename, ({ getClassName }) => {

  const lazyImagesMap = new WeakMap()
  let lazyImageObserver


  class LazyImage {

    constructor(el) {
      lazyImagesMap.set(el, this)
      this.el = $(el)
      lazyImageObserver.observe(this.el.get(0))
    }

    load() {
      this.el.attr('src', this.el.data('src'))
      lazyImageObserver.unobserve(this.el.get(0))
    }

  }

  LazyImage.initObserver = function() {
    require('intersection-observer')

    lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = lazyImagesMap.get(entry.target)
          if (lazyImage)
            lazyImage.load()
        }
      })
    })

    return Promise.resolve(lazyImageObserver)
  }

  return LazyImage
})
