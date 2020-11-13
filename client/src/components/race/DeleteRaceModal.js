import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

const DeleteRaceModal = ({ handleCancel, handleDelete }) => {
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Delete Race</Modal.Title>
      </Modal.Header>

      <Modal.Body>Confirm to delete this race.</Modal.Body>

      <Modal.Footer>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button variant='primary' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

DeleteRaceModal.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default DeleteRaceModal
