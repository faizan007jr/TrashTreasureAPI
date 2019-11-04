let sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res
            .status(404)
            .json({ "message" : "Invalid user" });
    }
};

module.exports = sessionChecker;