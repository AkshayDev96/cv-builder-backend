require('dotenv').config()

const express = require('express')
const DBconnect = require("./utils/DB");
const app = express()
const passport = require('passport')
const cors = require('cors')
app.use(express.json())
const session = require('express-session');

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY 
  }));


require('./utils/LoginStrategy')
require('./utils/passport')

app.use(passport.initialize())
app.use(passport.session())
app.use("/auth",require('./routes/auth.route'))
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