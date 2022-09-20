// const express = require('express')
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  console.log('hi middleware')
  console.log(req.originalUrl)
  console.log(req.originalUrl === "/event" && req.method === "GET" )
    // if(req.originalUrl === "/event" && req.method === "GET") {
    //   console.log('no authen')
    //   return next()
    // }
  let token = req.headers.authorization;
  token = token.replace("Bearer ", "");
  console.log("token", token)
  let verify = jwt.verify(token, process.env.JWT_SECRET);
  console.log("verify token", verify)
  if (verify) {
    req.user = verify.id
    return next()
  } else {
    return res.sendStatus(401);
  }
}


module.exports = checkToken;