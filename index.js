const express = require("express");
const db = require('./db');
const bcrypt = require('bcrypt');
const server = express()
const jwt = require('jsonwebtoken');
server.use(express.json());
const crypto = require('crypto');
const userapi = require('./routes/user');
const accountapi = require ('./routes/account')
const secretKey = crypto.randomBytes(32).toString('hex'); // Replace this with your actual secret key
const tripsapi = require('./routes/trips');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('No token provided.');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    // console.log(token)
    // console.log(secretKey)
    if (err) {
      return res.status(401).send('Failed to authenticate token.');
    }
    req.userId = decoded.id;
    next();
  });
}

// Protected route
server.get('/protected', verifyToken, (req, res) => {
  res.send('Protected route');
});

  
userapi.getusers(server,db)

accountapi.login(server,db,bcrypt,jwt,secretKey)

accountapi.register(server, db, bcrypt)

userapi.deleteuser(server,db)

tripsapi.trips(server,db)

tripsapi.gettrips(server,db)

tripsapi.deletetrips(server,db)

server.listen("3001" ,() => {
    console.log('3001');
});