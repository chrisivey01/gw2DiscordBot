const serviceCalls = require('../../services/newServiceCalls.js')

const test = (message) => {
    serviceCalls.testClass()
        .then(results => {
            message.channel.send(results)
        })
}
