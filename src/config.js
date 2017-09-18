'use strict'

var dotenv = require('dotenv')
var ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') dotenv.load()

var config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  SLACK_TOKEN: process.env.SLACK_TOKEN,
  ICON_EMOJI: ':seedling:'
}

module.exports = (key) => {
  if (!key) return config

  return config[key]
}
