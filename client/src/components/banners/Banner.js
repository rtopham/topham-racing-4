import React, { Fragment, useContext, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import Spinner from '../layout/Spinner'

import AuthContext from '../../context/auth/authContext'

const Banner = ({ match }) => {
  const authContext = useContext(AuthContext)

  const { banners, getBanners, loading } = authContext

  useEffect(() => {
    if (banners === null) getBanners(match.params.userId)
    //eslint-disable-next-line
  }, [banners])

  let bannerURL = ''
  let selectedBanner = 0

  if (banners !== null && !loading) {
    selectedBanner = Math.floor(Math.random() * banners.length)
    bannerURL = '/banners/' + banners[selectedBanner].filename
  }

  return (
    <Fragment>
      {banners !== null ? <Image fluid rounded src={bannerURL} /> : <Spinner />}
    </Fragment>
  )
}

export default Banner
