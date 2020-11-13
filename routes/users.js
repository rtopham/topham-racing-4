const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const path = require('path')
const fs = require('fs')

const User = require('../models/User')

// @route   POST api/users
// @desc    Register a user
// @access  Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    //Check to see if user exists

    try {
      let user = await User.findOneAndDelete({ email })
      if (user) {
        return res.status(400).json({ msg: 'User already exists' })
      }

      //Get User's Gravatar

      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

      // Create Instance of User

      user = new User({
        name,
        email,
        avatar,
        password
      })

      //Encrypt password

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          // Note, for production, set the following to 3600.
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

//@route    PUT api/users
//@desc     Update user profile
//@access   Private

router.put(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    const userFields = {}
    if (name) userFields.name = name
    if (email) userFields.email = email
    if (password) {
      const salt = await bcrypt.genSalt(10)
      userFields.password = await bcrypt.hash(password, salt)
    }

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: userFields },
        { new: true }
      )
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error.')
    }
  }
)

//@route    GET api/users/banners/:userId
//@desc     Get All of User's Banners
//@access   Public

router.get('/banners/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('banners')
    res.json(user.banners)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    PUT api/users/banners/newfilename
//@desc     Add banner filename (only adds filename, does not handle upload)
//@access   Private

router.put(
  '/banners/newfilename',
  [auth, [check('filename', 'Filename is required.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { filename } = req.body

    const newBanner = {
      filename
    }

    try {
      const user = await User.findOne({ _id: req.user.id })
      user.banners.unshift(newBanner)
      await user.save()
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error.')
    }
  }
)

//@route    PUT api/users/banners/userId
//@desc     Add new banner and handle upload
//@access   Private

router.post('/banners/:userId', auth, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }
  const bannerFile = req.files.banner
  let imgUrl = ''

  const saveBanner = async () => {
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 6; i += 1) {
      imgUrl += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    // Check to See if filename exists
    const existingBanners = await User.find({
      'banners.filename': { $regex: imgUrl }
    })
    if (existingBanners.length > 0) saveBanner()
    else {
      // Upload and save file to file system.
      const ext = path.extname(bannerFile.name).toLowerCase()
      const targetPath = path.resolve(`client/public/banners/${imgUrl}${ext}`)

      bannerFile.mv(targetPath, async (error) => {
        if (error) {
          console.error(error)
          res.writeHead(500, {
            'Content-Type': 'application/json'
          })
          res.end(JSON.stringify({ status: 'error', message: error }))
          return
        }
        try {
          const newBanner = {
            filename: imgUrl + ext
          }
          const user = await User.findOne({ _id: req.user.id })
          user.banners.unshift(newBanner)
          await user.save()
          res.json(user)
        } catch (err) {
          console.error(err.message)
          res.status(500).send('Server Error.')
        }

        //return res.status(200)
      })
    }
  }

  saveBanner()
})

//@route    DELETE api/users/banners/bannerId
//@desc     Delete Banner
//@access   Private

router.delete('/banners/:bannerId', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })

    const removeIndex = user.banners
      .map((item) => item.id)
      .indexOf(req.params.bannerId)
    const fileName = user.banners[removeIndex].filename
    user.banners.splice(removeIndex, 1)
    await user.save()
    fs.unlink(path.resolve(`client/public/banners/${fileName}`), (err) => {
      if (err) throw err
    })

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
