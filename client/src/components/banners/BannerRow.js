import React from 'react'
import DeleteBanner from './DeleteBanner'

const BannerRow = ({ user, banner }) => {
  const imgUrl = '/banners/' + banner.filename

  const divStyle = {
    height: '220px',
    width: '100%',
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundSize: 'cover',
    marginTop: '20px',
    color: 'white'
  }
  return (
    <div style={divStyle}>
      {banner._id}
      <DeleteBanner user={user} banner={banner} />
      <br />
      {banner.filename}
    </div>
  )
}

export default BannerRow
