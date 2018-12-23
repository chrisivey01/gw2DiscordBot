let api = 'http://localhost:3001'
const fetch = require("node-fetch");

module.exports = {
    testClass() {
        let url = api + `/test`
        return fetch(url)
            .then(results => results.text())
    },

    submitAPI(API, UID) {
        let data = {
            api: API,
            uid: UID
        }
        let url = api + '/submitAPI'
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(results => results.json())
    }


}