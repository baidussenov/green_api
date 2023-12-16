const send = require('../controllers/send')
const receive = require('../controllers/receive')

class M1 {

    createTask = num => send(num, 'tasks')

    receiveLastResult = () => receive('results')
}

module.exports = M1