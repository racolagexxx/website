const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const { BaseComponent, component } = require('../base')

module.exports = component(__filename, ({ getClassName }) => {

  const lazyImagesMap = new WeakMap()
  let lazyImageObserver


  class LazyImage extends BaseComponent {

    constructor(el) {
      super()
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
