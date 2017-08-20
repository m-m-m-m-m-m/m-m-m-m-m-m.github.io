var UserModel = require('model/UserModel');

exports.get = function (req, res) {
    UserModel
        .getUserById(req.params.id)
        .then(function (user) {
            if (user) {
                res.json({
                    id: user.id,
                    username: user.username,
                    email: user.email
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(function () {
            res.status(500).end();
        });
};

exports.put = function (req, res) {
    UserModel
        .updateUserById(req.params.id, req.body)
        .then(function (user) {
            if (user) {
                res.json({
                    id: user.id,
                    username: user.username,
                    email: user.email
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(function () {
            res.status(500).end();
        });
};

exports.delete = function (req, res) {
    UserModel
        .removeUserById(req.params.id)
        .then(function (user) {
            if (user) {
                res.json({message: `User has been successfully removed.`});
            } else {
                res.status(404).end();
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).end();
        });
};