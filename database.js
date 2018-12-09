var mysql = require('mysql')
var util = require('util')

// aws instance
// var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: '54.175.138.146',
//     user: 'root',
//     password: 'root',
//     database: 'yaksbend'
// })

//local
// var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: 'localhost',
//     user: 'root',
//     password: 'windowwasher1',
//     database: 'yaksbend'
// })

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'yaksbend'
})


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

pool.query = util.promisify(pool.query)
module.exports = pool