const path = require('path')
const jss = require('jss')
const preset = require('jss-preset-default').default
jss.default.setup(preset())

// Width threshold below which the app layout is mobile version
exports.mobileLayoutWidthThreshold = 500

// Center the contents of the element both vertically and horizontally
exports.centerFlexContent = (opts = {}) => {
  const styles = {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
  if (opts.centerVertically !== false) {
    styles.alignItems = 'center'
  }
  return styles
}

exports.responsiveWidth = (baseWidth) => {
  return {
    width: `${baseWidth}%`,
    '@media screen and (max-width: 700px) and (min-width: 400px)': {
      width: `${baseWidth + (100 - baseWidth) / 2}%`
    },
    '@media screen and (max-width: 400px)': {
      width: `${baseWidth + (100 - baseWidth) / 2}%`
    }
  }
}

exports.responsiveText = (baseSize, influence = 1) => {
  return {
    fontSize: `${baseSize}%`,
    '@media screen and (min-width: 950px) and (max-width: 1200px)': {
      fontSize: `${baseSize - influence * 0.1875 * baseSize}%`
    },
    '@media screen and (min-width: 700px) and (max-width: 950px)': {
      fontSize: `${baseSize - influence * 0.375 * baseSize}%`
    },
    '@media screen and (min-width: 500px) and (max-width: 700px)': {
      fontSize: `${baseSize - influence * 0.5 * baseSize}%`
    },
    '@media screen and (max-width: 500px)': {
      fontSize: `${baseSize - influence * 0.53 * baseSize}%`
    }
  }
}

const colors = exports.colors = {
  bgRed: '#ff4e44',
  bgWhite: '#f7f7f7',
  bgGrey: '#e3e3e3',
  textWhite: '#eef4f8',
  textRed: '#ff4e44',
  bgPurple: '#F2EEF2'
}
