const mongoose = require('mongoose')

const StravaProfileSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  strava_athlete_id: { type: String },
  strava_token: { type: String },
  strava_token_expires_at: { type: Number, default: 0 },
  strava_refresh_token: { type: String },
  strava_rides_url: { type: String },
  strava_activity_url: { type: String },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('StravaProfile', StravaProfileSchema)
