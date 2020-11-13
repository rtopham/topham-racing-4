import React, { useContext, useState } from 'react'
import { Button, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'

import AuthContext from '../../context/auth/authContext'

const DeleteBanner = ({ user, banner }) => {
  const authContext = useContext(AuthContext)

  const { deleteBanner } = authContext

  const [confirmDelete, setConfirmDelete] = useState(false)

  const deleteBannertip = (
    <Tooltip id='tooltip'>
      <strong>Delete this Banner</strong>
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
    setConfirmDelete(false)
    deleteBanner(user._id, banner._id)
  }

  if (confirmDelete)
    return (
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Delete Banner</Modal.Title>
        </Modal.Header>

        <Modal.Body>Confirm to delete this banner.</Modal.Body>

        <Modal.Footer>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    )
  else
    return (
      <OverlayTrigger placement='left' overlay={deleteBannertip}>
        <Button
          variant='link'
          className='float-right'
          size='small'
          onClick={clickDelete}
        >
          <i className='fa fa-trash-alt float-right'></i>
        </Button>
      </OverlayTrigger>
    )
}

export default DeleteBanner
