
module.exports = function (app, db, io) {

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

        var rooms = [];

        db.each("SELECT * FROM ROOMS", function (err, row) {
            rooms.push(row.name);
        });

        db.run("insert into ROOMS (name) values (?)",[req.body.room], function (err) {
            if(err == null){
                io.emit("roomAdded", req.body.room);
                res.status(200);
                return res.json(rooms);
                }
            res.status(400);
            return res.json(rooms);
        });
    })
};

