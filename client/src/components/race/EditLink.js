import React, { Fragment, useContext } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import RaceContext from '../../context/race/raceContext'

const EditLink = ({ race }) => {
  const raceContext = useContext(RaceContext)
  const { setSelected } = raceContext

  const tooltip = (
    <Tooltip id='tooltip'>
      <strong>Edit or Delete this race</strong>
    </Tooltip>
  )

  const clickEdit = (e) => {
    e.preventDefault()
    setSelected(race)
  }

  return (
    <Fragment>
      <a href={'#!'} onClick={clickEdit}>
        <OverlayTrigger placement='left' overlay={tooltip}>
          <i className='fa fa-pencil-alt float-right'></i>
        </OverlayTrigger>
      </a>
    </Fragment>
  )
}

EditLink.propTypes = {
  race: PropTypes.object.isRequired
}

export default EditLink
