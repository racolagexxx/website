// Entry point for static index.html page
const { sheets } = require('jss')

// Import all these so the components gets declared and CSS gets collected 
const BackgroundCanvas = require('~/components/BackgroundCanvas.static')
const PopUp = require('~/components/PopUp.static')
const PopUp1 = require('~/components/PopUp1.static')
const PopUp2 = require('~/components/PopUp2.static')
const PopUpStack = require('~/components/PopUpStack.static')
const Release = require('~/components/Release.static')
const ReleaseDetails = require('~/components/ReleaseDetails.static')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')

const cssClassesRegistry = require('~/registry-css-classes')
const componentRegistry = require('~/registry-static-components')

const IndexPage = require('~/components/page/IndexPage.static')


exports.renderHTML = function(attrs) {
  return IndexPage.renderHTML(attrs)
}


exports.renderCSS = function() {
  Object.values(componentRegistry.getRegistry())
    .forEach((component) => component.renderCSS())
  return sheets
}


exports.getCssClassesRegistry = function() {
  return cssClassesRegistry.getRegistry()
}