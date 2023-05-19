const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = (context) => {
  const authHeader = context.req.headers.authorization; // Extract the 'Authorization' header from the request
  if (authHeader) {
    // If the header exists
    const token = authHeader.split('Bearer ')[1]; // Extract the token from the header by splitting at 'Bearer '
    if (token) {
      // If the token exists
      try {
        const user = jwt.verify(token, secret, expiration); // Verify the token using the provided secret and expiration
        console.log(user); // Output the user information to the console
        return user; // Return the user object
      } catch (err) {
        throw new Error('Invalid/Expired token'); // Throw an error if the token is invalid or expired
      }
    } else {
      throw new Error('Authentication token must be \'Bearer [token]'); // Throw an error if the token is missing
    }
  } else {
    throw new Error('Authorization header must be provided'); // Throw an error if the 'Authorization' header is missing
  }
};





  // // function for our authenticated routes
  // authMiddleware: function (req, res, next) {
  //   // allows token to be sent via  req.query or headers
  //   let token = req.query.token || req.headers.authorization;

  //   // ["Bearer", "<tokenvalue>"]
  //   if (req.headers.authorization) {
  //     token = token.split(' ').pop().trim();
  //   }

  //   if (!token) {
  //     return res.status(400).json({ message: 'You have no token!' });
  //   }

  //   // verify token and get user data out of it
  //   try {
  //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
  //     req.user = data;
  //   } catch {
  //     console.log('Invalid token');
  //     return res.status(400).json({ message: 'invalid token!' });
  //   }

  //   // send to next endpoint
  //   next();
  // },
  // signToken: function ({ username, email, _id }) {
  //   const payload = { username, email, _id };

  //   return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  // },