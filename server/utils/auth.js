require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiration = '.5h';

module.exports = {
  signToken: function ({ user, _id }) {
    const payload = { user, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // function for authenticated routes
  authMiddleware: function ({ req }) {
    // token can be sent via req.query, req.headers, or req.body
    let token =
      req.query.token || req.headers.token || req.headers.authorization;

    // if token is req.headers.authorization we need to

    // extract the token value from ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        // split the token which will give us the value after the split
        .split(' ')
        // pop that value out of the list
        .pop()
        // trim any whitespace off the value popped.
        .trim();
    }

    if (!token) {
      return req;
    }

    // verify token and retrieve user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid Token');
    }

    // return the updated request
    return req;
  },
};