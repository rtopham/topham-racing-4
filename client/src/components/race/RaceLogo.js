import React, { Fragment } from 'react'
import icupLogo from '../../images/icup.jpg'
import mwLogo from '../../images/midweekSM.gif'
import USACLogo from '../../images/USACSM.gif'
import USCSLogo from '../../images/uscsSM.gif'
import chainRing from '../../images/chainringSM.gif'
import PropTypes from 'prop-types'

const RaceLogo = ({ series, styleString }) => {
  let logo = ''
  switch (series) {
    case 'Intermountain Cup':
      logo = icupLogo
      break
    case 'Mid-Week':
      logo = mwLogo
      break
    case 'USAC':
      logo = USACLogo
      break
    case 'Utah State Championship Series':
      logo = USCSLogo
      break
    default:
      logo = chainRing
      break
  }
  return (
    <Fragment>
      <img alt='Series Logo' className={styleString} src={logo} />
    </Fragment>
  )
}

RaceLogo.propTypes = {
  series: PropTypes.string,
  styleString: PropTypes.string
}

export default RaceLogo
