
module.exports = function (app, io) {

    app.post("/messenger", function (req,res) {

        io.emit("newMessage", req.body.messages);
        res.json("true");
    });
};