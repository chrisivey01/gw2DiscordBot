// Load up the discord.js library
const Discord = require("discord.js");
const fetch = require('node-fetch');


//my project imports
const serviceCalls = require("./project/services/serviceCalls");
const pool = require('./project/database/database');
const utils = require('./project/utils/utils')
const cron = require('node-cron');


//my global vars
var wvwPKills = [];
var ybCount = 0;
var linkCount = 0;
var spyCount = 0;


//automate IDs
let yaksBendServerId = 1003;
let linkedServerID;
let linkedServerID1;
let linkedServerID2;


// Channels
const chanKillCountsId = "521400998443352105";

var servers = [];
var red;
var blue;
var green;


var minIncre = 0;
var hourIncre = 12;
var twelveIncre = 0;


//new bot changes dec 2018
let accountId;
// let myApi = '9F1DA7B3-F32A-024F-B76A-7A496E9A207F7EAF1AF3-DB60-493B-B4E5-5503BA064F6B';

let holdText;


// cron.schedule('0 */1 * * *', () => {
//
//     client.channels.get("483881363100139521").send("Countdown to something HUUUUUUUUUGE!!" + hourIncre-- +" oh shit oh shit oh shit!!!" )
//
// });
//
//
// cron.schedule('0 */12 * * *', () => {
//
//     client.channels.get("483881363100139521").send("DK is a faggot!")
//
// });

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./auth.json");

// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Patrol`);
});

client.on("ready", () => {
    client.user.verified

})


//SEMI URGENT TO-DO: !UPDATE AND !PURGE ISSUE -> REMOVE "SET 1" TO UPDATE AND OUT OF PURGE

function abbreviateWords(_text) {
    return _text.replace("'", "").match(/\b(\w)/g).join('');
}

//api calls
const fetchAccounts = async (api) => {
    var url = 'https://api.guildwars2.com/v2/account?access_token='
    try {
        let response = await fetch(url + api)
        response = await response.json()
        return response
    } catch (e) {
        return false
    }
}


const fetchUsers = async (api) => {
    var url = 'https://api.guildwars2.com/v2/account?access_token='
    try {
        let response = await fetch(url + api)
        worldCheck = await response.json()
        return worldCheck
    } catch (e) {
        return false
    }
}


const wvwKills = async (api) => {
    var url = 'https://api.guildwars2.com/v2/account/achievements?access_token=' + api + '&id=283'

    try {
        let response = await fetch(url)
        wvwPKills = await response.json()
        return wvwPKills
    } catch (e) {
        return e.message
    }
}

const wvwScore = async () => {
    var url = 'https://api.guildwars2.com/v2/wvw/matches/scores?world=' + yaksBendServerId
    let wvwScores

    let response = await fetch(url)
    wvwScores = await response.json()
    return wvwScores
}

const updateServers = async () => {
    let url = 'https://api.guildwars2.com/v2/wvw/matches/overview?world=' + yaksBendServerId
    let wvwServers

    let response = await fetch(url)
    wvwServers = await response.json();
    return wvwServers

}

const getNames = async (serverId) => {
    let url = 'https://api.guildwars2.com/v2/worlds?ids=' + serverId
    let server

    let response = await fetch(url)
    server = await response.json();
    return server

}

async function serverList(message) {
    let worldArray = []
    let worldObj = {};
    let worlds;
    serviceCalls.overView()
        .then(results => {
            worlds = results
            for (let i = 0; i < worlds.length; i++) {
                worldObj = {}
                worldObj.serverId = worlds[i].id
                worldObj.serverName = worlds[i].name
                worldObj.serverPop = worlds[i].population
                worldArray.push(worldObj)
            }
        })
        .then(() => {
            message.channel.send({
                    embed: {
                        description:
                            '** Server Name: **' + worldArray[0].serverName + ' **Server Pop:** ' + worldArray[0].serverPop + ' **Id:** ' + worldArray[0].serverId + '\n' +
                            '**Server Name:** ' + worldArray[1].serverName + ' **Server Pop:** ' + worldArray[1].serverPop + ' **Id:** ' + worldArray[1].serverId + '\n' +
                            '**Server Name:** ' + worldArray[2].serverName + ' **Server Pop:** ' + worldArray[2].serverPop + ' **Id:** ' + worldArray[2].serverId + '\n' +
                            '**Server Name:** ' + worldArray[3].serverName + ' **Server Pop:** ' + worldArray[3].serverPop + ' **Id:** ' + worldArray[3].serverId + '\n' +
                            '**Server Name:** ' + worldArray[4].serverName + ' **Server Pop:** ' + worldArray[4].serverPop + ' **Id:** ' + worldArray[4].serverId + '\n' +
                            '**Server Name:** ' + worldArray[5].serverName + ' **Server Pop:** ' + worldArray[5].serverPop + ' **Id:** ' + worldArray[5].serverId + '\n' +
                            '**Server Name:** ' + worldArray[6].serverName + ' **Server Pop:** ' + worldArray[6].serverPop + ' **Id:** ' + worldArray[6].serverId + '\n' +
                            '**Server Name:** ' + worldArray[7].serverName + ' **Server Pop:** ' + worldArray[7].serverPop + ' **Id:** ' + worldArray[7].serverId + '\n' +
                            '**Server Name:** ' + worldArray[8].serverName + ' **Server Pop:** ' + worldArray[8].serverPop + ' **Id:** ' + worldArray[8].serverId + '\n' +
                            '**Server Name:** ' + worldArray[9].serverName + ' **Server Pop:** ' + worldArray[9].serverPop + ' **Id:** ' + worldArray[9].serverId + '\n' +
                            '**Server Name:** ' + worldArray[10].serverName + ' **Server Pop:** ' + worldArray[10].serverPop + ' **Id:** ' + worldArray[10].serverId + '\n' +
                            '**Server Name:** ' + worldArray[11].serverName + ' **Server Pop:** ' + worldArray[11].serverPop + ' **Id:** ' + worldArray[11].serverId + '\n' +
                            '**Server Name:** ' + worldArray[12].serverName + ' **Server Pop:** ' + worldArray[12].serverPop + ' **Id:** ' + worldArray[12].serverId + '\n' +
                            '**Server Name:** ' + worldArray[13].serverName + ' **Server Pop:** ' + worldArray[13].serverPop + ' **Id:** ' + worldArray[13].serverId + '\n' +
                            '**Server Name:** ' + worldArray[14].serverName + ' **Server Pop:** ' + worldArray[14].serverPop + ' **Id:** ' + worldArray[14].serverId + '\n' +
                            '**Server Name:** ' + worldArray[15].serverName + ' **Server Pop:** ' + worldArray[15].serverPop + ' **Id:** ' + worldArray[15].serverId + '\n' +
                            '**Server Name:** ' + worldArray[16].serverName + ' **Server Pop:** ' + worldArray[16].serverPop + ' **Id:** ' + worldArray[16].serverId + '\n' +
                            '**Server Name:** ' + worldArray[17].serverName + ' **Server Pop:** ' + worldArray[17].serverPop + ' **Id:** ' + worldArray[17].serverId + '\n' +
                            '**Server Name:** ' + worldArray[18].serverName + ' **Server Pop:** ' + worldArray[18].serverPop + ' **Id:** ' + worldArray[18].serverId + '\n' +
                            '**Server Name:** ' + worldArray[19].serverName + ' **Server Pop:** ' + worldArray[19].serverPop + ' **Id:** ' + worldArray[19].serverId + '\n' +
                            '**Server Name:** ' + worldArray[20].serverName + ' **Server Pop:** ' + worldArray[20].serverPop + ' **Id:** ' + worldArray[20].serverId + '\n' +
                            '**Server Name:** ' + worldArray[21].serverName + ' **Server Pop:** ' + worldArray[21].serverPop + ' **Id:** ' + worldArray[21].serverId + '\n' +
                            '**Server Name:** ' + worldArray[22].serverName + ' **Server Pop:** ' + worldArray[22].serverPop + ' **Id:** ' + worldArray[22].serverId + '\n' +
                            '**Server Name:** ' + worldArray[23].serverName + ' **Server Pop:** ' + worldArray[23].serverPop + ' **Id:** ' + worldArray[23].serverId
                    }
                }
            )
        })
}


function commands(message) {
    message.channel.send("Commands currently: " +
        "\n !users " +
        "\n !serverStatus " +
        "\n !kda " +
        "\n !score " +
        "\n !kills " +
        "\n !leaderboard " +
        // "\n !submit " +
        "\n !build " +
        "\n !serverList"
    );
}

function modCommands(message) {
    message.channel.send("Commands currently: " +
        "\n !verify " +
        "\n !update" +
        "\n !resetLeaderboard" +
        "\n !linkUpdate" +
        "\n !test"
    );
}

function users(message) {
    let totalMembers = [...message.guild.members]
    let verifiedMembers = 0;

    for (let i = 0; i < totalMembers.length; i++) {
        if (totalMembers[i][1].roles.has("521361620950056970")) {
            verifiedMembers++
        }
    }

    message.channel.send(
        'Total Members:' + totalMembers.length + '\n' +
        'Verified Members: ' + verifiedMembers);
}

//gets YB warscores
function serverStatus(message) {
    var url = 'https://api.guildwars2.com/v2/worlds?ids=1003';
    var info;

    fetch(url)
        .then(response => {
            response.json().then(json => {
                info = json;
                message.channel.send("population is currently : " + info[0].population)
            });
        });
}

async function kda(message) {
//get info
    red = null;
    blue = null;
    green = null;

    let enemyServers = await updateServers();

    let redId = enemyServers.worlds.red
    let blueId = enemyServers.worlds.blue
    let greenId = enemyServers.worlds.green

    if (red === null) {
        red = await getNames(redId)
    }
    if (blue === null) {
        blue = await getNames(blueId)
    }
    if (green === null) {
        green = await getNames(greenId)
    }

    //old crappy code
    var url = 'https://api.guildwars2.com/v2/wvw/matches/stats?world=1003'
    var info
    var redKda;
    var blueKda;
    var greenKda;

    fetch(url)
        .then(response => {
            response.json().then(json => {
                info = json;

                redKda = info.kills.red / info.deaths.red
                blueKda = info.kills.blue / info.deaths.blue
                greenKda = info.kills.green / info.deaths.green

                message.channel.send(red[0].name + " KDA: " + redKda.toFixed(2))
                message.channel.send(blue[0].name + " KDA: " + blueKda.toFixed(2))
                message.channel.send(green[0].name + " KDA: " + greenKda.toFixed(2))
            })
        })
}

async function keyAdd(message) {
    var storeAPI;
    var editedAPI;
    var userId;
    userId = message.author.id;
    storeAPI = message.content;
    editedAPI = storeAPI.replace('$key add ', '')
    let value = await fetchUsers(editedAPI)
    let result;

    if (value.text !== 'invalid key') {
        var values = {
            user_id: userId,
            api_key: editedAPI
        }
        var sql = "INSERT INTO users SET ? ON DUPLICATE KEY UPDATE api_key = VALUES(api_key)"
        try {
            result = await pool.query(sql, values)
            message.channel.send("You've been added to the DB!")
            message.author.send('Your discord User Id: ' + userId + "\n" + "Your API:" + editedAPI)
        } catch (err) {
            message.author.send("Bad API key, try again!")
            throw new Error(err)
        }
        let userToModify = client.guilds.get("476902310581239810").members.get(values.user_id)
        let verifiedRole = message.guild.roles.find("name", "Verified");
        let linkVerifiedRole = message.guild.roles.find("name", "Link Verified");

        //TODO THIS NEEDS TO CHANGE ALL THE TIME
        if (worldCheck.world === yaksBendServerId) {
            userToModify.addRole(verifiedRole.id)
            message.channel.send("You've been verified! Type !commands to see what I can do.")
        } else if (worldCheck.world === linkedServerID || worldCheck.world === linkedServerID1 || worldCheck.world === linkedServerID2) {
            userToModify.addRole(linkVerifiedRole.id)
        } else {
            message.channel.send("You do not belong to YB or Links")

        }
    }
}

async function leaderboard(message) {
    let sql = "select * from users where wvwkills is not null AND (on_yaks=1 OR on_yaks=2) order by wvwkills desc limit 10"
    let result;

    result = await pool.query(sql)
    console.log(result)

    //create leaderboard

    message.channel.send('Processing your request...')

    let storeUserInfo = result.map(({api_key, wvwkills}) => ({api_key, wvwkills}));

    for (let i = 0; i < storeUserInfo.length; i++) {
        let holder = await fetchAccounts(storeUserInfo[i].api_key)
        storeUserInfo[i]["name"] = holder.name
    }
    message.channel.send('Current top 10 in WVW Kills!')
    for (let i = 0; i < storeUserInfo.length; i++) {
        message.channel.send('Rank ' + (i + 1) + ' Account Name: ' + storeUserInfo[i].name + ' Kill Count: ' + storeUserInfo[i].wvwkills)
    }
}

async function update(message) {

    if (message.member.roles.find("name", "Mod") || message.member.roles.find("name", "Chris") ||
        message.member.roles.find("name", "@admin")) {
        let sql = "select * from users"
        let result = await pool.query(sql)

        message.channel.send("Beginning update... this may take a few moments")
        let addingAccountName;
        for (let i = 0; i < result.length; i++) {
            addingAccountName = await fetchAccounts(result[i].api_key)
            let insertSql = "UPDATE users SET account_id = ? WHERE api_key = ?"
            let addAccount = [
                account_id = addingAccountName.name,
                api_key = result[i].api_key
            ]
            await pool.query(insertSql, addAccount)
        }

        //
        // let removeUsersSql = " DELETE FROM yaksbend.users WHERE account_id IS NULL"
        // let resultRemove = await pool.query(removeUsersSql);
        // message.channel.send("Removed: " + resultRemove.length + " users" )
        // if (message)
        message.channel.send("Update completed!")

    } else {
        message.channel.send('You do not have access to this!')
    }
}


async function resetLeaderboard(message) {
    if (message.member.roles.find("name", "Mod") || message.member.roles.find("name", "Chris") ||
        message.member.roles.find("name", "@admin")) {
//// new code to update everyones wvwkills to current on leaderboard
        message.channel.send('Updating everyones kill count...')
        let queryKillCounts = "SELECT * FROM yaksbend.users WHERE wvwkills IS NOT NULL"
        let playersWithKills = await pool.query(queryKillCounts)

        for (let i = 0; i < playersWithKills.length; i++) {
            await wvwKills(playersWithKills[i].api_key);
            playersWithKills.wvwkills = wvwPKills.current


            let updateKills = "UPDATE users SET wvwkills = ? WHERE user_id = ?"
            let killLoad = [
                wvwkills = wvwPKills.current,
                user_id = playersWithKills[i].user_id
            ];

            await pool.query(updateKills, killLoad);

        }
///end new code
        message.channel.send('Clearing Weekly contenders....')
        let clearWeeklyTournySQL = "UPDATE users SET prev_count = NULL, current_count = NULL, weekly_kill_total = NULL"
        await pool.query(clearWeeklyTournySQL)
        message.channel.send('Done')

    } else {
        message.channel.send('You do not have access to this!')
    }
}

// __________________________ all new
//for announcement
const discordInfo = (message) => {
    message.channel.send('join me on -> https://discord.gg/uNsAttw')
}


//reset links
const testClass = (message) => {
    message.channel.send(`Link 1: ${linkedServerID} Link 2: ${linkedServerID1} Link 3: ${linkedServerID2} `)
}

const linkUpdate = (message) => {
    const url = `https://api.guildwars2.com/v2/wvw/matches/overview?world=${yaksBendServerId}`
    fetch(url)
        .then(response => response.json())
        .then(response => {
            for (let color in response.all_worlds) {
                // Check color for existence of yaksBendServerId
                if (response.all_worlds[color].indexOf(parseInt(yaksBendServerId)) !== -1) {
                    // Correct color detected; set valid_worlds accordingly
                    console.log(response.all_worlds[color]);
                    let links = response.all_worlds[color]

                    links.forEach(link => {
                        if (linkedServerID === undefined && link !== yaksBendServerId) {
                            linkedServerID = link;
                        } else if (linkedServerID1 === undefined && link !== yaksBendServerId) {
                            linkedServerID1 = link
                        } else if (link !== yaksBendServerId) {
                            linkedServerID2 = link
                        }
                    })
                }
            }
        })
        .then(() => {
            message.channel.send(`Links updated! Please type !test to verify`)
        })
};


//score code works fine
async function score(message) {
    let wvwScores = await wvwScore()

    //get info
    red = null;
    blue = null;
    green = null;

    let enemyServers = await updateServers();

    let redId = enemyServers.worlds.red
    let blueId = enemyServers.worlds.blue
    let greenId = enemyServers.worlds.green

    if (red === null) {
        red = await getNames(redId)
    }
    if (blue === null) {
        blue = await getNames(blueId)
    }
    if (green === null) {
        green = await getNames(greenId)
    }

    // Get server abbreviations
    let redServerNameAbbreviated = await abbreviateWords(red[0].name);
    let greenServerNameAbbreviated = await abbreviateWords(green[0].name);
    let blueServerNameAbbreviated = await abbreviateWords(blue[0].name);


    //total scores
    let redScore;
    let blueScore;
    let greenScore;
    redScore = wvwScores.scores.red;
    blueScore = wvwScores.scores.blue;
    greenScore = wvwScores.scores.green;


    //total skirm points
    let redSkirm;
    let blueSkirm;
    let greenSkirm;
    redSkirm = wvwScores.victory_points.red;
    blueSkirm = wvwScores.victory_points.blue;
    greenSkirm = wvwScores.victory_points.green;

    //current skirm
    let currentRed;
    let currentBlue;
    let currentGreen;

    let lastSkirm = wvwScores.skirmishes.pop()
    currentRed = lastSkirm.scores.red
    currentBlue = lastSkirm.scores.blue
    currentGreen = lastSkirm.scores.green

    let allScores = [redScore, blueScore, greenScore, redSkirm, blueSkirm, greenSkirm, currentRed, currentBlue, currentGreen];
    let allScoresMaxLength = allScores.sort(function (a, b) {
        return b.length - a.length;
    })[0].length;
    message.channel.send(
        {
            "embed": {
                "title": "WvW Status",
                "color": 16646144,
                "fields": [
                    {
                        "name": "Total",
                        "value": "```" + redServerNameAbbreviated.padStart(3, ' ') + ": " + redScore.toString().padStart(allScoresMaxLength, ' ') + "\n" + greenServerNameAbbreviated.padStart(3, ' ') + ": " + greenScore.toString().padStart(allScoresMaxLength, ' ') + "\n" + blueServerNameAbbreviated.padStart(3, ' ') + ": " + blueScore.toString().padStart(allScoresMaxLength, ' ') + "```",
                        "inline": true
                    },
                    {
                        "name": "Victory Points",
                        "value": "```" + redServerNameAbbreviated.padStart(3, ' ') + ": " + redSkirm.toString().padStart(allScoresMaxLength, ' ') + "\n" + greenServerNameAbbreviated.padStart(3, ' ') + ": " + greenSkirm.toString().padStart(allScoresMaxLength, ' ') + "\n" + blueServerNameAbbreviated.padStart(3, ' ') + ": " + blueSkirm.toString().padStart(allScoresMaxLength, ' ') + "```",
                        "inline": true
                    },
                    {
                        "name": "Current Skirmish",
                        "value": "```" + redServerNameAbbreviated.padStart(3, ' ') + ": " + currentRed.toString().padStart(allScoresMaxLength, ' ') + "\n" + greenServerNameAbbreviated.padStart(3, ' ') + ": " + currentGreen.toString().padStart(allScoresMaxLength, ' ') + "\n" + blueServerNameAbbreviated.padStart(3, ' ') + ": " + currentBlue.toString().padStart(allScoresMaxLength, ' ') + "```",
                        "inline": true
                    }
                ]
            }
        }
    );
}

//kill code, complex
async function kills(message) {
    var _output = "";
    // Thwart user attempt to run the command outside kill count channel
    if (message.channel.id != chanKillCountsId) {
        _output += "Try again in the " + message.guild.channels.get(chanKillCountsId) + " channel.";
    } else {
        // obtain userId of one who used kill command
        let userId = message.author.id;
        let sql = "SELECT api_key, wvwkills, account_id, prev_count FROM users where user_id = ?"
        let grabUserData;
        try {
            // query DB for the user data
            grabUserData = await pool.query(sql, [userId]);
        } catch (err) {
            throw new Error(err);
        }
        try {
            await wvwKills(grabUserData[0].api_key);
            let apiHolder = grabUserData[0].api_key;
            if (wvwPKills.current == undefined) {
                _output += "Your API key needs the \"progression\" permission. Register a new key and run the command again.";
            } else {
                _output += "Your kill total is " + wvwPKills.current;
                try {
                    let killDiff = wvwPKills.current - grabUserData[0].wvwkills;
                    if (grabUserData[0].wvwkills !== null) {
                        _output += ", an increase of " + killDiff + " over your previous total of " + grabUserData[0].wvwkills + ".";

                    } else {
                        _output += ". Since this is your first time running !kills, we've stored your current kill count. Try it again later to see your new kill count!";
                    }
                } catch (err) {
                }
                // update user DB with newest kill rank
                let killSql = "UPDATE users SET wvwkills = ? WHERE user_id = ?";
                let killLoad = [
                    wvwkills = wvwPKills.current,
                    user_id = userId
                ];
                await pool.query(killSql, killLoad);
            }
        } catch (e) {
            _output += "You need to be a verified user for this.";
        }
        if (grabUserData[0].account_id === undefined) {
            _output += "\nWeekly stats are currently unavailable. Try again later after the server has updated.";
        } else {
            try {
                await wvwKills(grabUserData[0].api_key);
                if (wvwPKills.current == undefined) {
                    _output += "\nYour API key needs the \"progression\" permission. Register a new key and run the command again.";
                } else {
                    //check to see if user_id is not in weekly tourny DB
                    let prev_count = parseInt(grabUserData[0].wvwkills);
                    let account_id = grabUserData[0].account_id;
                    if (grabUserData[0].prev_count === null) {
                        let pushPrevCountSQL = "UPDATE users SET prev_count = ? WHERE account_id = ?";
                        var values = [prev_count, account_id];
                        await pool.query(pushPrevCountSQL, values);
                    }
                    let current_count = wvwPKills.current;
                    let weekly_kill_total;
                    let kills_from_last;
                    if (grabUserData[0].prev_count === null) {
                        weekly_kill_total = 0;
                    } else {
                        weekly_kill_total = wvwPKills.current - grabUserData[0].prev_count;
                        kills_from_last = current_count - grabUserData[0].wvwkills;
                    }
                    let killWeeklySQL = "UPDATE users SET wvwkills = ?, current_count = ?, weekly_kill_total = ? WHERE account_id = ?";
                    // let killWeeklySQL = "UPDATE users SET wvwkills = ?, prev_count = ?, current_count = ?, weekly_kill_total = ? WHERE account_id = ?"
                    var values = [
                        current_count,
                        current_count,
                        weekly_kill_total,
                        account_id
                    ];
                    await pool.query(killWeeklySQL, values);
                    if (grabUserData[0].prev_count === null) {
                        _output += "\nYou've been added to the leaderboard at http://thetopyak.com/ - this gets updated every time you run !kills.";
                    } else {
                        _output += "\nYou're up to " + weekly_kill_total + " kills for the week.";
                        //_output += "\nYou've logged " + kills_from_last + " from the last update! Check the leaderboard at http://thetopyak.com/ for updates.";
                    }
                }
            } catch (e) {
                _output += "\nYou need to be a verified user for this.";

            }
        }
    }
    message.reply(_output);
}

//purge code
async function verifyUnverifyUsers(message) {
    if (message.member.roles.find("name", "Mod") || message.member.roles.find("name", "@admin")) {
//get all server users
        let totalMembers = message.guild.members;
//array of IDs
        let memberUniqueIdArray = []
        totalMembers.forEach(function (member) {
            memberUniqueIdArray.push(member.user.id)
        })
        let verifiedRole = message.guild.roles.find(name => name.name === "Verified");
        let linkVerifiedRole = message.guild.roles.find(name => name.name === "Link Verified");
        let commanderRole = message.guild.roles.find(name => name.name === "Commander");
        let modedRole = message.guild.roles.find(name => name.name === "Mod");
        let spyRole = message.guild.roles.find(name => name.name === "Thinks They're Sneaky");

        message.channel.send('Purge process starting...')
        let results;
        let sql = `SELECT user_id, api_key, on_yaks FROM users WHERE user_id IN (?)`
        results = await pool.query(sql, [memberUniqueIdArray])

        for (let i = 0; i < results.length; i++) {
            await serviceCalls.apiChecker(results[i].api_key)
                .then(player => {
                    let userToModify = client.guilds.get("476902310581239810").members.get(results[i].user_id)

                    if (!player.text) {
                        if (player.world === 1003) {
                            ybCount++
                            results[i].on_yaks = 1
                            userToModify.addRole(verifiedRole.id)

                        } else if (player.world === linkedServerID || player.world === linkedServerID1 || player.world === linkedServerID2) {
                            linkCount++
                            results[i].on_yaks = 2
                            userToModify.removeRole(verifiedRole.id)
                            userToModify.addRole(linkVerifiedRole)

                        } else {
                            spyCount++
                            userToModify.addRole(spyRole.id)
                            userToModify.removeRole(verifiedRole.id)
                            userToModify.removeRole(commanderRole.id)
                            userToModify.removeRole(modedRole.id)
                        }
                    }
                })
            let updateStatus = "UPDATE users SET on_yaks = ? WHERE api_key = ?"

            let updatedCode = [
                on_yaks = results[i].on_yaks,
                api_key = results[i].api_key
            ]
            await pool.query(updateStatus, updatedCode)
        }

        message.channel.send(`YB Count: ${ybCount} \n Link Count: ${linkCount} \n Spy Count: ${spyCount}`)
        message.channel.send("Purge process finished!")

        ybCount = 0;
        linkCount = 0;
        spyCount = 0;
    }
}

//submit API for multiple checks to see if valid or not.
const getApiUid = (message) => {
    let Uid = message.author.id;
    let getText = message.content;
    let obtainApi = getText.replace(`!submit `, ``)

    message.delete(message)
    message.channel.send('Deleted your API to save yo booty!')
//get API/UID/ACCOUNT NAME and submit to DB
    serviceCalls.apiChecker(obtainApi)
        .then(results => {
            let obtainResults = results;

            if (obtainResults.text) {
                return message.channel.send(`Invalid API try again!`)
            }
            //acount ID
            obtainResults.name
            obtainResults.id
//obtain character list, needed to see if have it turned on.
            serviceCalls.characterList(obtainApi)
                .then(results => {
                    let characters = results;
                    serviceCalls.buildProgressionOn(obtainApi, characters[0])
                        .then(buildOnCheck => {
                            if (!buildOnCheck.text) {
                                let submitAccountInfoSql = `INSERT INTO apiDiscordUid SET ? ON DUPLICATE KEY UPDATE api_key = VALUES(api_key), gw2_account_name = VALUES(gw2_account_name) `
                                let values = {api_key: obtainApi, uid: Uid, gw2_account_name: obtainResults.name}

                                pool.query(submitAccountInfoSql, values, (err, result) => {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + result.affectedRows);
                                    message.channel.send(`Added to the DB! Now submit your character using !build [name]`)
                                })
                            } else {
                                message.channel.send(`Please enable the BUILD progression`)
                            }
                        })
                        .catch(err => {
                            if (err) {
                                return message.channel.send(`fucked up!`)
                            }
                        })

                })
                .catch(err => {
                    if (err) {
                        return message.channel.send(`An oopsy woopsy little fuckity wuckity has happened!`)
                    }
                })
        })
        .catch(err => {
            if (err) {
                return message.channel.send(`Invalid API try again!`)
            }
        })
}

async function gearCharacter(message) {
    //get UID
    let discordUid = message.author.id;
    let text = message.content;
    let charactersEquipment = []
    let characterEquipmentWithoutStats = []
    let characterGearNowWithStats = []
    let allGear;
    let gw2Char = text.replace(`!build `, ``)

    let sql = 'SELECT api_key FROM users WHERE user_id = ?'
    let myApi = await pool.query(sql, [discordUid])
    serviceCalls.characterSubmit(gw2Char, myApi[0].api_key)
        .then(results => {
            if (results.text === "no such character") {
                message.channel.send('This character is not linked to your current API.')
                return;
            }else if (results.text === "invalid key") {
                message.channel.send('You have an invalid key issue.')
                return;
            }

            if (results.equipment) {
                message.channel.send(`Gimme one second... loading gear.`)

                results.equipment.forEach(eq => {
                    let equipment = {}
                    let equipmentWithoutStats = {}
                    if (eq.slot !== "HelmAquatic" && eq.slot !== "Sickle" && eq.slot !== "WeaponAquaticA" && eq.slot !== "Axe" && eq.slot !== "Logging" && eq.slot !== "Foraging" && eq.slot !== "Pick" && "WeaponAquaticA") {
                        if (eq.hasOwnProperty('stats')) {
                            if (eq.stats.hasOwnProperty('attributes')) {
                                equipment.id = eq.id
                                equipment.slot = eq.slot
                                equipment.stats = eq.stats
                                charactersEquipment.push(equipment)
                            }
                        } else {
                            equipmentWithoutStats.id = eq.id
                            equipmentWithoutStats.slot = eq.slot
                            characterEquipmentWithoutStats.push(equipmentWithoutStats)
                        }
                    }
                })

                //filter to just ids
                let characterEquipWithoutStatsIds = []
                characterEquipmentWithoutStats.forEach(eq => {
                    characterEquipWithoutStatsIds.push(eq.id)
                })


                let promiseArray = [utils.getGearNames(charactersEquipment), utils.getGearsWithoutStats(characterGearNowWithStats, characterEquipWithoutStatsIds.toString())]
                Promise.all(promiseArray)
                    .then((value) => {
                        console.log(value)

                        allGear = [...charactersEquipment, ...characterGearNowWithStats]
                        allGear.uid = discordUid
                        allGear.character_name = gw2Char
                        console.log(allGear)

                        return allGear

                    })

                    .then(() => {
                        //params
                        let uid = allGear.uid
                        let char_name = allGear.character_name


                        let equipItems = {}
                        // let item0,item1,item2,item3,item4,item5,item6,item7,
                        // item8,item9,item10,item11,item12,item13,item14,item15

                        for (let i = 0; i < 16; i++) {
                            if (utils.equipFilter(allGear[i]) !== undefined) {
                                equipItems[`item${i}`] = utils.equipFilter(allGear[i])
                            } else {
                                equipItems[`item${i}`] = ''
                            }
                        }

                        let item0 = equipItems.item0;
                        let item1 = equipItems.item1;
                        let item2 = equipItems.item2;
                        let item3 = equipItems.item3;
                        let item4 = equipItems.item4;
                        let item5 = equipItems.item5;
                        let item6 = equipItems.item6;
                        let item7 = equipItems.item7;
                        let item8 = equipItems.item8;
                        let item9 = equipItems.item9;
                        let item10 = equipItems.item10;
                        let item11 = equipItems.item11;
                        let item12 = equipItems.item12;
                        let item13 = equipItems.item13;
                        let item14 = equipItems.item14;
                        let item15 = equipItems.item15;

                        message.channel.send("Current Gear for: " + char_name + "\n" +
                            item0 + "\n" +
                            item1 + "\n" +
                            item2 + "\n" +
                            item3 + "\n" +
                            item4 + "\n" +
                            item5 + "\n" +
                            item6 + "\n" +
                            item7 + "\n" +
                            item8 + "\n" +
                            item9 + "\n" +
                            item10 + "\n" +
                            item11 + "\n" +
                            item12 + "\n" +
                            item13 + "\n" +
                            item14 + "\n" +
                            item15
                        );


                        let gearInfoSql = `INSERT INTO uid_character_gear SET ? ON DUPLICATE KEY UPDATE 
                              character_name = VALUES(character_name), item0 = VALUES(item0), item1 = VALUES(item1),  item2 = VALUES(item2), item3 = VALUES(item3),
                               item4 = VALUES(item4), item5 = VALUES(item5), item6 = VALUES(item6), item7 = VALUES(item7), item8 = VALUES(item8), item9 = VALUES(item9),
                                item10 = VALUES(item10), item11 = VALUES(item11), item12 = VALUES(item12), item13 = VALUES(item13), item14 = VALUES(item14), item15 = VALUES(item15) `
                        let values = {
                            uid: uid,
                            character_name: char_name,
                            item0: item0,
                            item1: item1,
                            item2: item2,
                            item3: item3,
                            item4: item4,
                            item5: item5,
                            item6: item6,
                            item7: item7,
                            item8: item8,
                            item9: item9,
                            item10: item10,
                            item11: item11,
                            item12: item12,
                            item13: item13,
                            item14: item14,
                            item15: item15
                        }
                        pool.query(gearInfoSql, values)
                    })
            }
        })
        .then(() => {
            serviceCalls.traitCheck(gw2Char, myApi[0].api_key)
                .then(results => {
                    let wvwSpecs = results.specializations.wvw
                    console.log(wvwSpecs);
                    let minorTraits = wvwSpecs[0].traits.toString()
                    let majorTraits = wvwSpecs[1].traits.toString()
                    let grandmasterTraits = wvwSpecs[2].traits.toString()

                    let allTraits = {}
                    allTraits.minorTraits = minorTraits
                    allTraits.majorTraits = majorTraits
                    allTraits.grandmasterTraits = grandmasterTraits
                    return allTraits
                })
                .then(allTraits => {
                    let minorTraitsAdjusted = []
                    serviceCalls.getTraitInfo(allTraits.minorTraits)
                        .then(results => {
                            for (let i = 0; i < results.length; i++) {
                                let minorObj = {}
                                minorObj.name = results[i].name
                                minorObj.desc = results[i].description
                                minorTraitsAdjusted.push(minorObj)
                            }
                            allTraits.minorTraits = minorTraitsAdjusted
                            return allTraits
                        })
                        .then(allTraits => {
                            let majorTraitsAdjusted = []
                            serviceCalls.getTraitInfo(allTraits.majorTraits)
                                .then(results => {
                                    for (let i = 0; i < results.length; i++) {
                                        let majorObj = {}
                                        majorObj.name = results[i].name
                                        majorObj.desc = results[i].description
                                        majorTraitsAdjusted.push(majorObj)
                                    }
                                    allTraits.majorTraits = majorTraitsAdjusted
                                    return allTraits
                                })
                                .then(allTraits => {
                                    let grandmasterAdjusted = []
                                    serviceCalls.getTraitInfo(allTraits.grandmasterTraits)
                                        .then(results => {
                                            for (let i = 0; i < results.length; i++) {
                                                let gmObj = {}
                                                gmObj.name = results[i].name
                                                grandmasterAdjusted.push(gmObj)
                                            }
                                            allTraits.grandmasterTraits = grandmasterAdjusted
                                            return allTraits
                                        })
                                        .then(allTraits => {
                                            message.channel.send("Traits: "+ allTraits.minorTraits[0].name + ", " + allTraits.minorTraits[1].name + ", " + allTraits.minorTraits[2].name + "\n"
                                                + allTraits.majorTraits[0].name + ", " + allTraits.majorTraits[1].name + ", " + allTraits.majorTraits[2].name + "\n"
                                                + allTraits.grandmasterTraits[0].name + ", " + allTraits.grandmasterTraits[1].name + ", " + allTraits.grandmasterTraits[2].name)



                                            let traitInfoSql = `INSERT INTO uid_character_traits SET ? ON DUPLICATE KEY UPDATE 
                              character_name = VALUES(character_name), trait0 = VALUES(trait0), trait1 = VALUES(trait1),  trait2 = VALUES(trait2), trait3 = VALUES(trait3),
                               trait4 = VALUES(trait4), trait5 = VALUES(trait5), trait6 = VALUES(trait6), trait7 = VALUES(trait7), trait8 = VALUES(trait8) `
                                            let values = {
                                                uid: discordUid,
                                                character_name: gw2Char,
                                                trait0: allTraits.minorTraits[0].name,
                                                trait1: allTraits.minorTraits[1].name,
                                                trait2: allTraits.minorTraits[2].name,
                                                trait3: allTraits.majorTraits[0].name,
                                                trait4: allTraits.majorTraits[1].name ,
                                                trait5: allTraits.majorTraits[2].name ,
                                                trait6: allTraits.grandmasterTraits[0].name ,
                                                trait7: allTraits.grandmasterTraits[1].name ,
                                                trait8: allTraits.grandmasterTraits[2].name

                                            }
                                            pool.query(traitInfoSql, values)

                                        })
                                })
                        })
                })
        })
        .then(()=>{
            serviceCalls.getCharacterProfession(gw2Char, myApi[0].api_key)
                .then(results => {
                    let professionName = results.profession
                    let myData = {
                        uid: discordUid,
                        character_name: gw2Char,
                        profession: professionName
                    }
                    let professionSql = `INSERT INTO uid_character_profession SET ? `

                    pool.query(professionSql, myData)

                    console.log(professionName)
                })
        })
}


client.on("message", async (message) => {
    if (message.author.bot) return;

    if (message.channel.id === "481688120215994378") {

        let userId = message.author.id;
        let userToModify = client.guilds.get("476902310581239810").members.get(userId)

        if (!message.content.startsWith("$key add")) {
            if (userToModify.roles.has("477947826442338324")) {

            } else {
                message.channel.send("Looks like you are not verified, please type this as followed\n$key add [API KEY HERE WITHOUT BRACKETS]")
            }
        }
    }


    if (message.content.startsWith("$key add")) {
        await keyAdd(message);
    }
    /*Base commands*/
    if (message.content.startsWith("!")) {
        if (message.content.match("!commands")) {
            commands(message);
        } else if (message.content.match("!users")) {
            users(message);
        } else if (message.content.match("!serverStatus")) {
            serverStatus(message);
        } else if (message.content.match("!kda")) {
            await kda(message);
        } else if (message.content.match("!score")) {
            await score(message);
        } else if (message.content.match("!kills")) {
            await kills(message);
        } else if (message.content.match("!leaderboard")) {
            await leaderboard(message);

        // else if (message.content.match("!submit")) {
        //     getApiUid(message)
        } else if (message.content.match("!build")) {
            await gearCharacter(message)
        } else if (message.content.match("!discord")) {
            discordInfo(message)
        }

        /*Mod commands*/
        else if (message.content.match("!modCommands")) {
            modCommands(message);
        } else if (message.content.match("!verify")) {
            await verifyUnverifyUsers(message)
        } else if (message.content.match("!resetLeaderboard")) {
            await resetLeaderboard(message);
        } else if (message.content.match("!update")) {
            await update(message);
        } else if (message.content.match("!serverList")) {
            await serverList(message);
        } else if (message.content.match("!linkUpdate")) {
            linkUpdate(message)
        } else if (message.content.match("!test")) {
            testClass(message)
        }

        else {
            message.channel.send('This command does not exist. Type !commands')
        }
    }
});

client.login(config.token);

