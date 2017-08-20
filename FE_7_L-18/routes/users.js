var UserModel = require('model/UserModel');

exports.get = function (req, res) {
    UserModel
        .getAllUsers()
        .then(function (users) {
            if (!users.length) {
                res.json(JSON.stringify(users));
            } else {
                res.json(users.map(function (user) {
                    return {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    };
                }));
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).end();
        });
};

exports.post = function (req, res, next) {
    UserModel
        .addNewUser(req.body)
        .then(function (confirm) {
            if (confirm) {
                res.status(201).end();
            } else {
                res.status(409).end();
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).end();
        });
};