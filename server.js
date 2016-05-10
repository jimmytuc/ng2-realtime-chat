
var express = require("express"),
    path = require("path"),
    app = express(),
    bodyParser = require("body-parser"),
    io = require("socket.io").listen(app.listen(3000));

app.use("/lib", express.static(path.resolve(__dirname,"lib")));
app.use("/node_modules", express.static("../node_modules"));
app.use("/app", express.static(path.resolve(__dirname, "app")));
app.use("/assets", express.static(path.resolve(__dirname, "assets")));
app.use(bodyParser.json());
app.get("/", function(req, res){

    res.sendFile(path.resolve(__dirname, "index.html"));
});

require("./server/routes/messenger")(app,io);

