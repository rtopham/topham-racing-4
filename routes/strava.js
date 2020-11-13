const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const stravaAuth = require('../middleware/stravaAuth')
const { check, validationResult } = require('express-validator')

//const User = require('../models/User')
const StravaProfile = require('../models/StravaProfile')

//@route    GET api/strava/me
//@desc     Get current user's strava credentials
//@access   Private

router.get('/edit/me', auth, async (req, res) => {
  try {
    const strava = await StravaProfile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar'])
    if (!strava) {
      return res
        .status(400)
        .json({ msg: 'There are no Strava Credentials for this user.' })
    }
    res.json(strava)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error.')
  }
})

//@route    GET api/strava/:userId
//@desc     Get user's Strava Profile
//@access   Public

router.get('/:userId', async (req, res) => {
  try {
    const strava = await StravaProfile.findOne({
      user: req.params.userId
    }).populate('user', ['name', 'avatar'])
    if (!strava) {
      return res
        .status(400)
        .json({ msg: 'There is no Strava Profile for this user.' })
    }
    res.json(strava)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error.')
  }
})

//@route    POST api/strava
//@desc     Create or Update strava Profile
//@access   Private

router.post(
  '/',
  [
    auth,
    [
      check('strava_athlete_id', 'Strava Athlete Id is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      strava_athlete_id,
      strava_token,
      strava_token_expires_at,
      strava_refresh_token,
      strava_rides_url,
      strava_activity_url
    } = req.body

    //Build strava object

    const stravaFields = {}
    stravaFields.user = req.user.id
    if (strava_athlete_id) stravaFields.strava_athlete_id = strava_athlete_id
    if (strava_token) stravaFields.strava_token = strava_token
    if (strava_token_expires_at)
      stravaFields.strava_token_expires_at = strava_token_expires_at
    if (strava_refresh_token)
      stravaFields.strava_refresh_token = strava_refresh_token
    if (strava_rides_url) stravaFields.strava_rides_url = strava_rides_url
    if (strava_activity_url)
      stravaFields.strava_activity_url = strava_activity_url

    try {
      let strava = await StravaProfile.findOne({ user: req.user.id })
      if (strava) {
        //Update
        strava = await StravaProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: stravaFields },
          { new: true }
        )
        return res.json(strava)
      }
      //Create
      strava = new StravaProfile(stravaFields)
      await strava.save()
      res.json(strava)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error.')
    }
  }
)

//@route    POST api/strava/refresh/:userId/:stravaSecret
//@desc     Update Strava Tokens
//@access   Private

router.put(
  '/refresh/:userId/:stravaSecret',
  stravaAuth,

  async (req, res) => {
    try {
      //Update
      const strava = await StravaProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: req.body },
        { new: true }
      )
      return res.json(strava)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error.')
    }
  }
)

module.exports = router
