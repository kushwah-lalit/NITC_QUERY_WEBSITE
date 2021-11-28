const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "25032000Ka@",
    database: "qawebapp",
    multipleStatements: true,
});
mysqlConnection.connect(function(err) {
    if (err) {
        console.log(`Error while connecting to DB ${err}`);
    } else {
        console.log("yeah!!!! Connected to DB");
    }

});
module.exports = mysqlConnection;