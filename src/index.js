'use strict'

var _ = require('lodash')
var config = require('./config')
var Botkit = require('botkit')
var moment = require('moment-timezone')

var controller = Botkit.slackbot({})
var bot = controller.spawn()

bot.configureIncomingWebhook({ url: process.env.WEBHOOK_URL })

var msgDefaults = {
  response_type: 'in_channel',
  username: 'testfit',
  icon_emoji: config('ICON_EMOJI')
}

var activeHours = ['10', '11', '12', '14', '15', '16']
var today = moment().tz('America/Los_Angeles')
var hourOfDay = today.format('H')

function notificationValid() {
  if (today.weekday() === 0 || today.weekday() === 6) {
    return false
  } else if (activeHours.indexOf(hourOfDay) === -1) {
    return false
  }
  return true
}

function determineGreeting() {
  var greetings = [
    'Hey there! It\'s time for... ',
    'Me again! How about... ',
    'You\'re gonna hate me, but... ',
    'I\'ve got a fun one for you! Let\'s do... ',
    'Yup, you guessed it... '
  ]
  var greeting = ''
  switch(hourOfDay) {
    case '10':
      greeting = 'Good morning! Let\'s get this day started with... '
    case '14':
      greeting = 'Time to work off that lunch... '
    case '16':
      greeting = 'Last one! Let\'s do... '
    default:
      greeting = greetings[Math.floor(Math.random() * greetings.length)]
  }
  return greeting
}

function determineExercise() {
  var exercises = [
    '20 push-ups (2 sets of 10 each).',
    '20 squats.',
    'a 1 minute plank.',
    '20 calf raises (2 sets of 10 each).',
    '20 lunges (10 for each leg).'
  ]
  return exercises[Math.floor(Math.random() * exercises.length)]
}

function notify() {
  if (notificationValid()) {
    var text = determineGreeting() + determineExercise()
    let msg = _.defaults({ "text": text }, msgDefaults)
    bot.sendWebhook(msg, (err, res) => {
      if (err) throw err
    })
  }
}

notify()
