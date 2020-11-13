const config = require('config')

module.exports = function (req, res, next) {
  // Get Secret from Params

  const stravaUpdateSecret = req.params.stravaSecret

  // Check if not authorized

  if (!stravaUpdateSecret) {
    return res.status(401).json({ msg: 'Authorization denied' })
  }

  try {
    if (stravaUpdateSecret === config.get('stravaUpdateSecret')) {
      req.user = { id: req.params.userId }
    } else throw 'Bad Secret'
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Request is not valid ' + err })
  }
}
