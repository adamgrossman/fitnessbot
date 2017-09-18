'use strict'

var slack = require('slack')
var _ = require('lodash')
var config = require('./config')

var bot = slack.rtm.client()

bot.started((payload) => {
  this.self = payload.self
})

bot.message((msg) => {
  if (!msg.user) return
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return

  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: msg.channel,
    username: 'FareWellFitness',
    text: 'Let\'s get moving!'
  }, (err, data) => {
    if (err) throw err
    var txt = _.truncate(data.message.text)
    console.log(`${txt}`)
  })
})

module.exports = bot
