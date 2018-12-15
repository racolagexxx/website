const $ = global.jQuery = require('jquery/dist/jquery.slim.js')

const IndexPage = require('~/components/page/IndexPage')

$(document).ready(() => {
  new IndexPage()
})
