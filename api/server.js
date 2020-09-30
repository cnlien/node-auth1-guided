const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./errorHandler.js")
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const usersRouter = require("../users/users-router.js");
const authRouter = require('../auth/auth-router.js')

const server = express();

const sessionConfig = {
  name: "sessionCookie",
  secret: "not typically stored here",
  cookie: {
    maxAge: 60 * 60 * 1000,
    secure: false, // TYPICALLY THIS IS `TRUE` BUT FOR THIS PROJECT WE DON'T MIND IF THE REQUEST IS NOT SENT OVER HTTPS
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  store: knexSessionStore({
    knex: require('../database/connection.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    creattable: true,
    clearInterval: 60 * 60 * 1000
  })
}

server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use('/api/auth', authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use(errorHandler);

module.exports = server;