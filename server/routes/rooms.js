
module.exports = function (app, db) {

    app.get("/rooms", function (req, res) {

        var rooms = [];

        db.each("SELECT * FROM ROOMS", function(err, row) {
            rooms.push(row.name);
        }, function() {

            // All done fetching records, render response
            res.json(rooms);
        })
    });

    app.post("/rooms", function (req, res) {

        db.run("insert into ROOMS (name) values (?)",[req.body.room], function (err) {
            if(err == null){
                res.status(200);
                return res.json("room added successfully");
                }
            res.status(400);
            return res.json("room already exist");
        });
    })
};