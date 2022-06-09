const path = require("path");
const mongoose = require("mongoose");
const express = require("express");

// 모델
const { Post } = require("./model/Post");
const { Counter } = require("./model/Counter");
const { User } = require("./model/User");

const config = require("./config/key");
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "../client/build/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", require("./router/post.js"));
app.use("/api/user", require("./router/user.js"));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening at http://localhost:${port}`);
      console.log("Connecting MongoDB...");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/post/submit", (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      const CommunityPost = new Post(temp);
      CommunityPost.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
          () => res.status(200).json({ success: true })
        );
      });
    })
    .catch((err) => res.status(400).json({ success: false }));
});

app.post("/api/post/list", (req, res) => {
  Post.find()
    .exec()
    .then((doc) => res.status(200).json({ success: true, postList: doc }))
    .catch((err) => res.status(400).json({ success: false }));
});

app.post("/api/post/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/post/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/post/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});
