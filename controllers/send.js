const connect = require('./connect')

module.exports = (num, queue) =>
    new Promise((resolve, reject) => {
        connect(async (error0, connection) => {
            if (error0) throw error0

            await connection.createChannel(async (error1, channel) => {
                if (error1) throw (error1.msg)

                const msg = num.toString()

                await channel.assertQueue(queue, { durable: true })

                await channel.sendToQueue(queue, Buffer.from(msg))
            })

            setTimeout(() => {
                connection.close()
                resolve()
            }, 500)
        })
    })