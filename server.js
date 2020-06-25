const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// db.Workout.create({ name: "New Workout" })
//     .then(dbLibrary => {
//         console.log(dbLibrary);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})

        .then(results => {
            res.json(results);
        })



});



app.put("/api/workouts/:id", (req, res) => {
    var id = req.params.id

    db.Workout.update(
        { _id: id },
        { $push: { exercises: req.body } }

    )
        .then(results => {
            res.json(results);
        })
    // db.Workout.create(body)
    //     .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
    //     .then(dbLibrary => {
    //         res.json(dbLibrary);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
});


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

// If no matching route is found default to home
app.get("stats", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});
;
// app.get("/", (req, res) => {
//     db.Book.find({})
//         .then(dbBook => {
//             res.json(dbBook);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("", (req, res) => {
//     db.Library.find({})
//         .then(dbLibrary => {
//             res.json(dbLibrary);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("", (req, res) => {
//     db.Library.find({})
//         .populate("books")
//         .then(dbLibrary => {
//             res.json(dbLibrary);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});