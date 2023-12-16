const connect = require('./connect')

module.exports = queue =>
    new Promise((resolve, reject) => {
        let num

        connect(async (error0, connection) => {
            if (error0) throw error0

            await connection.createChannel(async (error1, channel) => {
                if (error1) throw error1

                await channel.assertQueue(queue, { durable: true })

                channel.prefetch(1) // to make RabbitMQ consume a single message
                await channel.consume(queue, msg => {
                    num = Number(msg.content)
                }, { noAck: true })
            })

            setTimeout(() => {
                connection.close()
                if (num !== undefined)
                    resolve(num)
                reject('No message found')
            }, 500)
        })
    })