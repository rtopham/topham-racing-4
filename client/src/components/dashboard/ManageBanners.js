import React, { useState, useContext } from 'react'
import { Card, FormGroup, Button } from 'react-bootstrap'
import AuthContext from '../../context/auth/authContext'

import BannerRow from '../banners/BannerRow'

const formData = new FormData()

const ManageBanners = ({ user }) => {
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState(null)

  const authContext = useContext(AuthContext)

  const { banners, addBanner } = authContext

  const onChange = (e) => {
    const value = e.target.files[0]
    const validExtension = new RegExp(
      '(' + ['.jpg', '.gif', '.png'].join('|').replace(/\./g, '\\.') + ')$'
    ).test(value.name)

    if (!validExtension) setError('Please choose an image file')
    else {
      setFileName(value.name)
      formData.set('banner', e.target.files[0])

      setError(null)
    }
  }

  const clickUploadBanner = (e) => {
    e.preventDefault()
    addBanner(user._id, formData)
  }

  return (
    <div className='NewBanner'>
      <Card>
        <Card.Header>
          <Card.Title>Upload New Banner</Card.Title>
        </Card.Header>
        <Card.Body>
          <form onSubmit={clickUploadBanner}>
            <FormGroup className='NewPhoto'>
              <input
                name='bannerFileName'
                accept='image/*'
                onChange={onChange}
                id='icon-button-file-2'
                type='file'
              />
              <label htmlFor='icon-button-file-2'>
                <Button
                  variant='link'
                  className='upload-photo-buttons'
                  as='span'
                >
                  <i className='fa fa-image fa-2x'></i>
                </Button>
              </label>
              <span className='NewBannerFileName'>{fileName}</span>
            </FormGroup>
            <FormGroup>
              {error && (
                <span>
                  <i className='fa fa-exclamation'></i> {error}
                </span>
              )}
            </FormGroup>
            <FormGroup>
              <Button
                variant='primary'
                type='submit'
                disabled={fileName === ''}
              >
                Upload
              </Button>
            </FormGroup>
          </form>
        </Card.Body>
      </Card>
      {banners.map((banner) => {
        return <BannerRow banner={banner} user={user} key={banner._id} />
      })}
    </div>
  )
}

export default ManageBanners
