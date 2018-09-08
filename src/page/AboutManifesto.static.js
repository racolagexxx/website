const PopUp = require('../components/PopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')
const PopUpStack = require('../components/PopUpStack.static')
const theme = require('../theme')
const { component } = require('../base.static')

module.exports = component(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {

    return `
      <div class="${getClassName()}">

        ${PopUpStack.renderHTML(
          {
            'class': [ getClassName('popUpContainerInner') ],
            variant: 'messy',
            resetButton: true,
            autoResize: true
          }, `

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/spam-computer.jpg' } }
          )}

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/dont-email-my-wife.jpg' } }
          )}

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
            <p>
              <quote>
              <i class="doubleQuoteOpen">“</i>If I told you there was a great way to promote your band all over the net, for free, you'd probably think, 'Yeah, what's the catch？' <i class="doubleQuoteClose">”</i> <a href="http://www.arkade.com/content/Content/Marketing+Your+Product/You've+got+to+be+seen+to+be+heard!!+Tips+on+how+to+link+to+your+site+on+Arkade" target="_blank">[read more]</a>
              </quote>

              <quote>
              <i class="doubleQuoteOpen">“</i>Music artists who are just starting out need to find some of the easiest ways of getting their music online and promoting it for the most success. It can now be done from the comfort of your own home, which makes your promotion easy and cheap.<i class="doubleQuoteClose">”</i> <a href="http://www.heartbeatmuzic.com/promote-your-music-2/" target="_blank">[read more]</a>
              </quote>
            </p>
          `)}

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/enlarge-magic-wand.jpg' } }
          )}

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/justin-biebers-girlfriend.jpg' } }
          )}

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/the-hammer.jpg' } }
          )}

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
            <p>
              <quote>
              <i class="doubleQuoteOpen">“</i>Think of yourself as Jessica Simpson or Kim Kardashian. These women understand that they are brands and can put their names on a product, from shoes to lotion, knowing that it will sell big just because of who they are. <i class="doubleQuoteClose">”</i> <a href="http://www.wikihow.com/Promote-Your-Music" target="_blank">[read more]</a>
              </quote>
              <quote>
              <i class="doubleQuoteOpen">“</i>One of the biggest misconceptions held by unsigned artists is that great music will always find its way to the masses. McDonald’s, Papa John’s and Subway do not make the best burgers, pizza or grinders, but they are most recognizable brands because they do the best job of MARKETING and PROMOTING their product.<i class="doubleQuoteClose">”</i> <a href="http://www.theindieauthority.com/top-18-ways-to-promote-your-music-in-2015/" target="_blank">[read more]</a>
              </quote>
            </p>
          `)}

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/soundcloud-buy-followers2.png' } }
          )}

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/spamming-lord-much-on-soundcloud.jpg' } }
          )}

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
            <p>
              <quote>
              <i class="doubleQuoteOpen">“</i>Musicians today are accustomed to waiting in line for just about everything. After all, it’s busy as hell out there. While it’s necessary to wait in some lines, and good results can come of that, if you merely play by the rules and wait in lines you’ll get stagnancy, and that isn’t a very fun gift to open up for Christmas.<i class="doubleQuoteClose">”</i> <a href="http://www.musicthinktank.com/blog/11-reasons-why-your-music-self-promotion-isnt-working.html" target="_blank">[read more]</a>
              </quote>
              <quote>
              <i class="doubleQuoteOpen">“</i>Music marketing is a rapidly evolving challenge in a saturated industry; so how can you successfully promote your music online？<i class="doubleQuoteClose">”</i> <a href="http://www.orchard.co.uk/Blog/I-want-to-be-famous-How-to-promote-your-music-online-3889.aspx" target="_blank">[read more]</a>
              </quote>
            </p>
          `)}

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/your-band-is-a-virus.jpg' } }
          )}

          ${MediaPopUp.renderHTML(
            { image: { srcUrl: 'images/about-images/dont-pretend-you-dont-want-me.jpg' } }
          )}

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
            <p>
              <quote>
              <i class="doubleQuoteOpen">“</i>When people leave your show, are they going to remember you as that person with good lyrics and a good voice？ Or will they remember you as that person who stood out and outshone all the other performing acts that night？<i class="doubleQuoteClose">”</i> <a href="http://www.musicthinktank.com/blog/how-to-promote-your-music-the-ultimate-guide.html" target="_blank">[read more]</a>
              </quote>
              <quote>
              <i class="doubleQuoteOpen">“</i>As a musician you want to be able to reach your target audience. You want to be the name on everyone’s lips. You want your brand of music to hit the airwaves and make instant impact. [...] The opportunity to have the crowds cheering and chanting your name as you become as necessary as air to your teeming fans beckons.<i class="doubleQuoteClose">”</i> <a href="http://www.music-promotion.net/" target="_blank">[read more]</a>
              </quote>
            </p>
          `)}

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
            <p>
              The following is a compilation of music promotion advices <b>found online</b>.
            </p>
          `)}

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
            <p>
              If you are interested in releasing a track with racolage.xxx, contact us directly on facebook, twitter,
              or send an email to <a href="mailto://racolagexxx@protonmail.com">racolagexxx@protonmail.com</a>
              (do not mention <b>racolage.xxx</b> in your email otherwise it will be classified as spam - no joke).
              Please provide the following :

              <ul class="${getClassName('bulletList')}">
                <li>the title of your release (e.g. artist name - title) : 30 characters max</li>
                <li>a description for your release : 200 characters max</li>
                <li>an image</li>
                <li>an audio track : mp3 format</li>
              </ul>
            </p>
          `)}

        `)}
      </div>
    `
  }

  const renderCSS = function() {
    createStyleSheet({
      '': {
        extend: [ theme.centerFlexContent() ]
      },
      popUpContainerInner: {
        width: '69%',
        height: '100%'
      },
      bulletList: {
        listStyle: 'circle',
        marginLeft: '2em'
      }
    })
  }

  return { renderCSS, renderHTML }

})
