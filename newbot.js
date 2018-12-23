// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();

//my files
const serviceCalls = require("./services/newServiceCalls");
const utility = require("./.idea/utility/utility")
const config = require("./auth.json");


client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Doing stuff`);
});

client.on("ready", () => {
    client.user.verified

})





client.on("message", (message) => {
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

    const test = (message) => {
        serviceCalls.testClass()
            .then(results => {
                message.channel.send(results)
            })
    }

    const api = (message) => {
        let getText = message.content;
        let getAPI = getText.replace('!api ', '')
        let getUID = message.author.id

        serviceCalls.submitAPI(getAPI, getUID)
            .then(results =>{
                console.log('API submitted')
                let user = client.guilds.get("476902310581239810").members.get(results.uid)
                let verifiedRole = message.guild.roles.find(name => name.name === "Verified");

                if(results.world === 1003 ){
                    message.channel.send(`Welcome Yaks Bender! You're signed up to the DB`)
                    user.addRole(verifiedRole)
                }else{
                    message.channel.send(`Non bender! Die in a fire!`)
                    user.removeRole(verifiedRole)
                }
            })
            .catch(err => {
                console.log('Error at submitAPI')
            })
        message.channel.send(`you typed ${getAPI} your UID is ${getUID}`)
    }

    if (message.content.startsWith("!test")) {
        test(message);
    }else if (message.content.startsWith("!api")){
        api(message)
    }
});

client.login(config.token);





//automate tasks
var cron = require('node-cron');

var wvwPKills = [];
var ybCount = 0;
var linkCount = 0;
var spyCount = 0;

var yaksBendServerID = 1003;
var linkedServerID = 1005;
var linkedServerID1 = 1021;
var linkedServerID2 = 1020;

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


