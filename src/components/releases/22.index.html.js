const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const PopUp2 = require('~/components/PopUp2.static')
const MediaPopUp = require('~/components/MediaPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')


module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/22/screengrab1.jpg' }
      })}
      
      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '10/04/2018',
        table: [
          ['Femdom Videos Uploaded', '18 (10 + 8)'],
          ['Total Plays From Femdom Videos', '78764 (30177 + 48587)'],
          ['YouTube Spam Videos Uploaded', '3'],
          ['Total Plays From Emails', '618'],  
        ]
      })}

      ${PopUp2.renderHTML(
        {}, `
        <p>
          Part 2/4 from <b>ivvill - cutyou</b> the first ever EP released on racolage.xxx. 
        </p>
        <p>
          To celebrate, we tried a new YouTube spam method. 
          We simply hijack trending topics (in this case, <i>Ariana Grande</i> and <i>Pet Sematary</i>) to generate traffic to our YouTube videos.
          People, search, click and start to watch, but instead of Ariana Grande's voice, they will hear a racolage.xxx release.
        </p>
        <iframe
          width="100%" height="auto"
          src="https://www.youtube.com/embed/v5XNuV8vb-g"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
        <p>
          In addition, the track was released on several porn streaming sites.
        </p>
      `)}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
