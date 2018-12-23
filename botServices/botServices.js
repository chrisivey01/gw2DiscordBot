const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3001;
const router = express.Router();
const fetch = require("node-fetch");


//define DB
const pool = require('../database/database')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/test', function (req, res, next) {

    pool.query(`SELECT * from users`)
    let results = 'if this works chris will have to redo the bot.'
    res.send(results);
});

app.post('/submitAPI', function (req, res, next) {
    let uid = req.body.uid
    let api = req.body.api
    let values = {};
    let url = `https://api.guildwars2.com/v2/account?access_token=${api}`
    return fetch(url)
        .then(results => results.json())
        .then(results => {
            if (results) {
                console.log(results)
                let user_id = results.name
                let world = results.world
                // var sql = "INSERT INTO users SET ? ON DUPLICATE KEY UPDATE api_key = VALUES(api_key)"

                let sqlSubmitUidApi = `INSERT INTO users SET ? ON DUPLICATE KEY UPDATE api= VALUES(api), user_id=VALUES(user_id), world=VALUES(world)`
                values = {
                    api: api,
                    uid: uid,
                    user_id: user_id,
                    world: world
                }
                pool.query(sqlSubmitUidApi, values)
            }

            return values
        })
        .then(values => {
            res.send(values)
        })
})


//get all users and order them by highest to lowest kill totals
app.get('/users', function (req, res, next) {
    connection.query('SELECT * from users WHERE weekly_kill_total IS NOT NULL AND (on_yaks=1 OR on_yaks=2) ORDER BY wvwkills ASC', function (err, results) {
        if (err) throw err;
        res.send((results));
    })
});

app.get('/usersWeekly', async function (req, res, next) {
    await connection.query('SELECT * from users WHERE weekly_kill_total IS NOT NULL AND (on_yaks=1 OR on_yaks=2) ORDER BY weekly_kill_total ASC', function (err, results) {
        if (err) throw err;
        res.send((results));
    })
});


//top overall killer
app.get('/topKiller', function (req, res, next) {
    connection.query('SELECT * from users WHERE weekly_kill_total IS NOT NULL AND (on_yaks=1 OR on_yaks=2) ORDER BY wvwkills DESC LIMIT 1', function (err, results) {
        if (err) throw err;
        res.send((results));
    })
});


//get the top weekly killer
app.get('/topWeekly', function (req, res, next) {
    connection.query('SELECT * from users WHERE weekly_kill_total IS NOT NULL AND (on_yaks=1 OR on_yaks=2) ORDER BY weekly_kill_total  DESC LIMIT 1', function (err, results) {
        if (err) throw err;
        res.send((results));
    })
});


app.use(router);
app.listen(port);



