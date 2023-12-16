const send = require('../controllers/send')
const receive = require('../controllers/receive')

class M2 {
    resolveLastTask = () => {
        receive('tasks')
            .then(async num => {
                console.log(`Solving for ${num}...`)
                const result = num * 2
                send(result, 'results')
            })
            .catch(msg => { console.error(msg) })
    }
}

module.exports = M2