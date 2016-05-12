
var express = require("express"),
    path = require("path"),
    app = express(),
    bodyParser = require("body-parser"),
    sqlite3 = require("sqlite3").verbose(),
    io = require("socket.io").listen(app.listen(3000));

var db = new sqlite3.Database(":memory:");

db.serialize(function() {
//create table if not exist
    db.run("CREATE TABLE IF NOT EXISTS ROOMS"
        + "(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"
        + "name TEXT"
        + ")"
    ),
    db.run(
        "CREATE TABLE IF NOT EXISTS USERS"
        + "(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"
        + "nickName TEXT"
        + ")"
    )
});

app.use("/lib", express.static(path.resolve(__dirname,"lib")));
app.use("/node_modules", express.static("../node_modules"));
app.use("/app", express.static(path.resolve(__dirname, "app")));
app.use("/assets", express.static(path.resolve(__dirname, "assets")));
app.use(bodyParser.json());
app.get("/", function(req, res){

    res.sendFile(path.resolve(__dirname, "index.html"));
});

require("./server/routes/messenger")(app,io);
require("./server/routes/rooms")(app,db);
require("./server/routes/user")(app, db);

