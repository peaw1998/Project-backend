const router = require("express").Router();
const Exercise = require("../model/Exercise");
const Subject = require("../model/Subject");
const Score = require("../model/Score");
const jwt = require("jwt-simple");

//Exercise
router.get("/api/exercises", (req, res) => {
  Exercise.find({}, function (err, users) {
    res.send({ users: users });
  });
});

router.get("/api/exercise/:id", (req, res) => {
  Exercise.findOne({ _id: req.params.id }, function (err, user) {
    if (user) {
      res.send(user);
    } else {
      res.status(400).send("not found user");
    }
  });
});

router.get("/exercise/score/:id", (req, res) => {
  Exercise.findOne({ _id: req.params.id })
    .populate("scoreID")
    .exec(function (err, exercise) {
      if (exercise) {
        return res.send(exercise.scoreID.AllScore);
      } else res.status(400).send("not found exercise");
    });
});

router.post("/exercise/score/:id", (req, res) => {
  Exercise.findOne({ _id: req.params.id }).exec(function (err, result) {
    Score.findOne({ _id: result.scoreID }).exec(function (err2, result2) {
      result2.AllScore = [
        ...result2.AllScore,
        {
          username: jwt.decode(
            req.headers.authorization.split(" ")[1],
            "MY_SECRET_KEY"
          ).username,
          score: req.body.score,
        },
      ];
      result2.save(function (err3, result3) {
        if (err3 || !result3) {
          return res.status(400).send(err3);
        } else {
          return res.send(req.timestamp);
        }
      });
    });
  });
});

router.get("/api/exercises/subject/:id", (req, res) => {
  Subject.findOne({ _id: req.params.id })
    .populate("exerciseID")
    .exec(function (err, exercises) {
      if (err || !exercises) {
        res.send([]);
      } else {
        res.send(exercises.exerciseID);
      }
    });
});

router.post("/api/exercise", (req, res) => {
  let instance = new Exercise({
    type: req.body.type,
    preTest: req.body.preTest,
    postTest: req.body.postTest,
    Question: req.body.Question,
  });
  instance.save(function (err, result) {
    if (err || !result) {
      res.status(400).send(err);
    } else {
      let newExercise = result.toObject();
      let id = newExercise._id;
      Subject.findOneAndUpdate(
        { _id: req.body.subjectId },
        { $push: { exerciseID: id } },

        function (err1, result1) {
          if (result1) {
            res.send("Create Success");
          } else {
            res.status(400).send(err1);
          }
        }
      );
    }
  });
});

router.put("/api/exercise/:id", (req, res) => {
  Exercise.findByIdAndUpdate(
    { _id: req.params.id },
    { Question: req.body.Question },
    function (err, result) {
      if (err) {
        res.sendStatus(400).send("update error");
      } else {
        res.send("update success");
        //asdf
      }
    }
  );
});

// router.get("/exercise/score/:id",(req,res)=>{
//   Exercise.findOne({ _id: req.params.id }, function(err, result) {
// return res.send(result)

// });

router.delete("/api/exercise/:id", (req, res) => {
  Exercise.findOneAndDelete({ _id: req.params.id }, function (err, result) {
    if (result) {
      Subject.findOneAndUpdate(
        { exerciseID: result._id },
        { $pull: { exerciseID: result._id } },
        function (err1, result1) {
          if (result1) {
            res.send("Delete Success");
          } else {
            res.status(400).send(err1);
          }
        }
      );
    } else {
      res.status(400).send("delete error");
    }
  });
});

module.exports = router;
