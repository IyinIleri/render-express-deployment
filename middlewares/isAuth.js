const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
   try {
     // gets the header from the req
     const authHeader = req.headers.authorization;

     //  checks if the header is available
     if(!authHeader || !authHeader.startsWith("Bearer ")){
         throw new Error("No token Provided")
     }
 
     // extracts the token from authHeader
     const token = authHeader.split(" ")[1];
 
     // verify the token making use of jsonwebtoken
     const decoded = jwt.verify(token, process.env.JWT_KEY);
     req.user = {
         id: decoded.id
     };
 
     next();
   } catch (error) {
    error.message = "Token is Invalid or is invalid. Please login again";
    next(error)
   }



}

module.exports = isAuthenticated;