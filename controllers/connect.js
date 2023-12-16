const amqp = require('amqplib/callback_api')

const HOST = '127.0.0.1'

module.exports = clb => amqp.connect(`amqp://${HOST}`, clb)