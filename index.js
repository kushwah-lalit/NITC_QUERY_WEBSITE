const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
// const expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);
// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);
app.use(express.static('./assets'));
app.use('/',require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');
app.use(bodyParser.json());


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
app.listen(port,function(err){
    if(err){
        console.log(`Error while runnning the server: ${err}`);
    }
    console.log(`Server running on port: ${port}`);
});
