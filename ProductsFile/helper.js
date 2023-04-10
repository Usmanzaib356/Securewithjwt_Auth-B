const jwt = require('jsonwebtoken')
const secret_key = process.env.Secret


function verifyToken(req, res, next) {
    if (req.headers.x_access_token) {
      var token = req.headers.x_access_token;
      try {
        var decoded = jwt.verify(token, secret_key);
        if (decoded) {
          return next();
        } 
      } catch(error) {
        console.log(error);
        
        res.status(401).send("Invalid token");
      }
    } else {
      res.status(400).send("Token missing");
    }
  }



  module.exports = verifyToken