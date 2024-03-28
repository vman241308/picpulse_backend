const jwt = require('jsonwebtoken');

module.exports.verifyUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Authentication failed' });
    }
};