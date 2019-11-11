const jwt = require('jsonwebtoken');

module.exports = (req, res ,next) => {
    try {
        const decode = jwt.verify(req.body.token, "somesecret");
        req.userCookie = decode;
        next();
    } catch (e) {
        return res.status(401)
            .json({
                "message": "Invalid user"
            });
    }
};