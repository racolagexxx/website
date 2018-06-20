const $ = global.jQuery = require('jquery/dist/jquery.slim.js')

const Page = require('./page/Page')

$(document).ready(() => {
  new Page()
})
