const express = require('express');

const cookieSession = require("cookie-session");
const cors = require('cors');
// const Topic = require('../src/Models/Topic')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose');
const app = express();

const port = 3001;

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ['https://server-dapy.vercel.app']
}
))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cookieSession({
    name: "dapy-session",
    secret: "Dapy2022",
    httpOnly: false
  })
);

const db = require("./Models");
const Role = db.role;
const Topic = db.topic;
require('./routes/Auth')(app);
require('./routes/User')(app);
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
initial()

db.mongoose.connect('mongodb+srv://Dapy:Dapy@cluster0.gxfy42y.mongodb.net/?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

app.get('/getAll',async (req, res) => {
  const result = await Topic.find()
  res.send(result);
});

app.post('/postTopic',async (req, res) => {
  const Post = new Topic(req.body);
  const created = await Post.save();
  res.json(created);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});