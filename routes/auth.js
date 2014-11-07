/// <reference path="../nodeTypes/serverTypes.ts" />
/// <reference path="../utilities/authFactory.ts" />
var authHelper = require('../utilities/authFactory.js');
var UserScheme = require('mongoose').model('User');
module.exports.login = function (req, res) {
    if (!req.body)
        return res.status(400).end();
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password)
        return res.status(400).end();
    UserScheme.findOne({ username: username }, function (error, user) {
        if (error || !user)
            return res.status(401).end();
        var hash = authHelper.hashPassword(user.salt, password);
        if (user.password !== hash)
            return res.status(400).end();
        authHelper.encodeToken(user._id, function (token, expires) {
            res.json({
                token: token,
                expires: expires,
                user: user
            });
        });
    });
};
module.exports.check = function (req, res, next) {
    var token = req.headers.auth;
    if (!token)
        return next();
    try {
        var decoded = authHelper.decodeToken(token);
        if (new Date() >= new Date(decoded.exp))
            return next();
        req.userId = decoded.iss;
        return next();
    }
    catch (err) {
        return next();
    }
};
module.exports.profile = function (req, res) {
    if (!req.userId)
        return res.status(401).end();
    UserScheme.findOne({ _id: req.userId }, function (error, user) {
        if (error || !user) {
            return res.status(401).end();
        }
        res.json(user);
    });
};
//# sourceMappingURL=auth.js.map