
module.exports = function (app, db) {
    
    app.post("/user", function (req, res) {

        var user = req.body.user;
        db.run("insert into USERS(nickName) values(?)", [user.nickName], function (err) {
            return res.json(err);
        }, function () {
            return res.json("true");
        });
    });
};