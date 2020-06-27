const path = require("path");




module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    // If no matching route is found default to home
    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

}


