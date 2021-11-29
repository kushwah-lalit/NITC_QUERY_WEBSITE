// import sql connection
const mysqlConnection = require('../connection');
// action to render the home page and sending the data from the DB in objects to render on Homescreen
module.exports.home = function(req, res) {
// query to fetch all the questions and answers from the table and send them in chronological order as per requirement
    var sql = "SELECT * FROM question ORDER BY Creation_datetime DESC;SELECT * FROM answer ORDER BY Creation_datetime";
    mysqlConnection.query(sql, [1, 2], function(err, data, fields) {
        if (err)
            throw err;
        return res.render('home', { title: 'HomeScreen', userData: data[0], answer: data[1] });
    });
}