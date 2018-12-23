const fetch = require('node-fetch');
const apiTest = 'http://localhost:3001'

module.exports = {
    testClass:function(){
        let url = apiTest + `/test`
        return fetch(url)
            .then(results => results.text())
    },
    apiChecker:function(api) {
        let url = `https://api.guildwars2.com/v2/account?access_token=${api}`
            return fetch(url)
            .then(results => results.json())
    },

    characterList:function(api){
        let url = `https://api.guildwars2.com/v2/characters?access_token=${api}`
            return fetch(url)
            .then(results => results.json())
    },

    buildProgressionOn:function(api, randomString){
        let url = `https://api.guildwars2.com/v2/characters/${randomString}/equipment?access_token=${api}`
            return fetch(url)
                .then(buildOnCheck => buildOnCheck.json())
    },

    characterSubmit:function(api, character){
        let url = `https://api.guildwars2.com/v2/characters/${character}/equipment?access_token=${api}`
            return fetch(url)
                .then(results => results.json())
    },

    // //select all gear and shows stats
    // checkGearStats:function(api, character){
    //     let url =`https://api.guildwars2.com/v2/characters/${character}/equipment?access_token=${api}`
    //         return fetch(url)
    //             .then(results => results.json())
    // },

    gearCheck:function(itemIds){
        let url = `https://api.guildwars2.com/v2/items?ids=${itemIds}`
        return fetch(url)
            .then(results => results.json())
    },



    //need to get equipment and push ID, can forward it to yaksbend website for builds people are using? sounds like a good idea.




    //obtain user data from DB

    userData:function(){

    }
}


