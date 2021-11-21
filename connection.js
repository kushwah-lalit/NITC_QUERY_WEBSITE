const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"password",
    database:"DBMS_QUERY_WEBAPP",
    multipleStatements: true,
});
mysqlConnection.connect(function(err){
    if(err){
        console.log(`Error while connecting to DB ${err}`);
    }else{
        console.log("yeah!!!! Connected to DB");
    }

});
module.exports = mysqlConnection;