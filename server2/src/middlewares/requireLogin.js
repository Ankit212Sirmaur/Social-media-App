const jwt = require('jsonwebtoken');
const { success, error } = require("../utils/responseWrapper");
module.exports = async (req, res, next) => {
    if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.json('Authorization is required');
    }
    const accesstoken = req.headers.authorization.split(" ")[1]; // bearer ..token
    try {
        const decode = jwt.verify(accesstoken, process.env.Access_token_key);
        // now we get the id in the token => so we can pass further in the req
        req._id = decode._id;
        next();
    } catch (e) {
        console.log(e);
        return res.send(error('invalid token from the middleware', 401));
    }
}