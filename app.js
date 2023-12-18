const express = require('express')
const app = express()
const port = 8080

const M1 = require('./microservices/m1')
const M2 = require('./microservices/m2')
const m1 = new M1()
const m2 = new M2()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    next()
})

// saves in req.body data of request body*
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>This is a test project from <i>green-api</i> by <i>baidussenov!</i></h1>')
})

app.post('/', (req, res) => {
    const { num } = req.body
    if (!num)
        return res.json({ success: false, msg: 'Param num missing' })
    if (typeof num !== 'number')
        return res.json({ success: false, msg: 'Param num must be a number' })
    try {
        console.log('Creating a task...')
        m1.createTask(num).then(() => {
            m2.resolveLastTask()

            setTimeout(() => {
                m1.receiveLastResult()
                    .then(result => {
                        res.json({
                            success: true,
                            num, result
                        })
                    })
                    .catch(msg => {
                        res.json({
                            success: false,
                            msg
                        })
                    })
            }, 3500) // 3500 because 1.5 sec is already spent
        })
    } catch (err) { 
        console.error(err.msg)
        res.json({
            success: false,
            msg: err.msg
        })
     }
})

app.listen(port, () => {
    console.log(`Running on port ${port}...`)
})