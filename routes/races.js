const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Race = require('../models/Race')

// @route   GET api/races/:userId
// @desc    Get all user's races
// @access  Public

router.get('/:userId', async (req, res) => {
  try {
    const races = await Race.find({ postedBy: req.params.userId }).sort({
      race_date: -1
    })
    res.json(races)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/races
// @desc    Add new race
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('race_name', 'Race Name is required').not().isEmpty(),
      check('series', 'Race Series is required').not().isEmpty(),
      check('race_date', 'Race date is required').not().isEmpty(),
      check('time', 'Race time is required').not().isEmpty(),
      check('rank', 'Race rank is required').not().isEmpty(),
      check('category', 'Race category is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    const {
      race_name,
      series,
      race_date,
      location,
      time,
      rank,
      category
    } = req.body
    try {
      const newRace = new Race({
        race_name,
        series,
        race_date,
        location,
        time,
        rank,
        category,
        postedBy: req.user.id
      })
      const race = await newRace.save()
      res.json(race)
    } catch (err) {
      console.error(er.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   PUT api/races/:id
// @desc    Update race
// @access  Private

router.put(
  '/:id',
  [
    auth,
    [
      check('race_name', 'Race Name is required').not().isEmpty(),
      check('series', 'Race Series is required').not().isEmpty(),
      check('race_date', 'Race date is required').not().isEmpty(),
      check('time', 'Race time is required').not().isEmpty(),
      check('rank', 'Race rank is required').not().isEmpty(),
      check('category', 'Race category is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const {
      series,
      race_name,
      race_date,
      time,
      category,
      location,
      rank
    } = req.body
    //Build Race Object
    const raceFields = {
      race_name,
      series,
      race_date,
      location,
      time,
      rank,
      category
    }

    try {
      let race = await Race.findById(req.params.id)
      if (!race) return res.status(404).json({ msg: 'Race not found' })

      //Make sure user owns race
      if (race.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' })
      }
      race = await Race.findByIdAndUpdate(
        req.params.id,
        { $set: raceFields },
        { new: true }
      )
      res.json(race)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/races/:id
// @desc    Delete race
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let race = await Race.findById(req.params.id)
    if (!race) return res.status(404).json({ msg: 'Race not found' })

    //Make sure user owns race
    if (race.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' })
    }
    await Race.findByIdAndRemove(req.params.id)
    res.json({ msg: 'Race removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
