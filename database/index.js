const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host:'us-cdbr-east-05.cleardb.net',
    user:'b15bf087daadeb',
    password:'ddb21e5d',
    database:'heroku_a139d3ee503f873',
    port:3306
})

let sqlConnection = (sql) => {
    return new Promise((resolve, reject) => {

        pool.query(sql, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}
module.exports = {sqlConnection}