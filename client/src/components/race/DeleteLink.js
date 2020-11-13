import React, { Fragment, useContext, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import RaceContext from '../../context/race/raceContext'
import DeleteRaceModal from './DeleteRaceModal'

const DeleteLink = ({ race }) => {
  const raceContext = useContext(RaceContext)
  const { deleteRace, setDeleteAlert } = raceContext

  const [confirmDelete, setConfirmDelete] = useState(false)

  const tooltip = (
    <Tooltip id='tooltip'>
      <strong>Delete this race</strong>
    </Tooltip>
  )

  const clickDelete = (e) => {
    e.preventDefault()
    setConfirmDelete(true)
  }

  const handleCancel = () => {
    setConfirmDelete(false)
  }

  const handleDelete = () => {
    setDeleteAlert()
    setConfirmDelete(false)
    deleteRace(race._id)
  }

  return (
    <Fragment>
      {confirmDelete && (
        <DeleteRaceModal
          race={race}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      )}
      <a href={'#!'} onClick={clickDelete}>
        <OverlayTrigger placement='left' overlay={tooltip}>
          <i className='fa fa-trash-alt float-right'></i>
        </OverlayTrigger>
      </a>
    </Fragment>
  )
}

DeleteLink.propTypes = {
  race: PropTypes.object.isRequired
}

export default DeleteLink
