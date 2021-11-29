// sql connection
const mysqlConnection = require('../connection');
// action to render the profile page
module.exports.create = function(req, res) {
// query to get the all the question and answer from the db
    var sql = "SELECT * FROM question ORDER BY Creation_datetime DESC;SELECT * FROM answer ORDER BY Creation_datetime";
    mysqlConnection.query(sql, [1, 2], function(err, data, fields) {
        if (err)
            throw err;
            // sending the fetched questions, local user name rollnumber and email
        return res.render('profile', { title: 'Profile Page', userData: data[0], answer: data[1], name: req.user.name, roll: req.user.rollnum, mail: req.user.email });
    });
}