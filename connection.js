// import nysql
const mysql = require('mysql');
// cerate connection
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "DBMS_QUERY_WEBAPP",
    multipleStatements: true,
});
//  connect to DB with the credentials
mysqlConnection.connect(function(err) {
    if (err) {
        console.log(`Error while connecting to DB ${err}`);
    } else {
        console.log("yeah!!!! Connected to DB");
    }

});
// export the connection
module.exports = mysqlConnection;