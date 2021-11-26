const mysqlConnection = require('../connection');
module.exports.home = function(req, res) {

    var sql = "SELECT * FROM question ORDER BY Creation_datetime DESC;SELECT * FROM answer ORDER BY Creation_datetime DESC";
    mysqlConnection.query(sql, [1, 2], function(err, data, fields) {
        if (err)
            throw err;
        return res.render('home', { title: 'HomeScreen', userData: data[0], answer: data[1] });
    });
}