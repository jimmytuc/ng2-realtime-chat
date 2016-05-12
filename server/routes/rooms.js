
module.exports = function (app, db) {

    app.get("/rooms", function (req, res) {

        var rooms = [];

        db.run("insert into ROOMS(name) values(?)", ["dddsadas"]);
        //var rooms = db.run("SELECT * FROM ROOMS");
        db.each("SELECT * FROM ROOMS", function(err, row) {
            rooms.push(row.name);
        }, function() {

            // All done fetching records, render response
            res.json(rooms);
        })
    });

    app.post("/rooms", function (req, res) {
        db.run("insert into ROOMS(name) values(?)", ["dddsadas"]);
        return res.json("sdas");
    })
};