require('dotenv').config()

const express = require('express')
const DBconnect = require("./utils/DB");
const app = express()
const passport = require('passport')
const cors = require('cors')
app.use(express.json())
const session = require('express-session');
const path = require('path')

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)

app.set('trust proxy', 1)
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY 
  }));

//passportjs strategy
require('./utils/LoginStrategy')
require('./utils/passport')
//passport configuration
app.use(passport.initialize())
app.use(passport.session())

//mapping router
app.use("/auth",require('./routes/auth.route'))
app.use("/user",require('./routes/user.route'))
app.use(express.static(path.join(__dirname, 'uploads')));

app.get('/uploads/:id', function(req, res) {
  res.sendFile(path.join(path.join(__dirname, 'uploads'), req?.params?.id));
});

const PORT = process.env.PORT

DBconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Error while server start", e.message);
  });