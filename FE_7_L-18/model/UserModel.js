var fs = require('fs');
var crypto = require('crypto');
var config = require('config');
var DATA_STORAGE = 'storage.data.json';


module.exports = {
    getAllUsers: getAllUsers,
    addNewUser: addNewUser,
    getUserById: getUserById,
    removeUserById: removeUserById,
    updateUserById: updateUserById
};

function getAllUsers() {
    return new Promise(function (resolve, reject) {
        fs.readFile(DATA_STORAGE, 'utf8', function (err, data) {
            if (err) reject(err);
            var users;
            try {
                users = JSON.parse(data);
            } catch (err) {
                users = [];
            }
            resolve(users);
        });
    });
}

function addNewUser(user) {
    return getAllUsers()
        .then(function (users) {
            if (userExist(user, users)) return false;
            users.push({
                id: availableId(users),
                username: user.username,
                email: user.email,
                password: encryptPassword(user.password)
            });
            return saveData(users);
        })
}

function getUserById(id) {
    return getAllUsers()
        .then(function (users) {
            return findUserById(users, id);
        })
}

function updateUserById(id, changedParameters) {
    return getAllUsers()
        .then(function (users) {
            var user = findUserById(users, id);
            if (user) {
                changedParameters.username && (user.username = changedParameters.username);
                changedParameters.email && (user.email = changedParameters.email);
                changedParameters.password && (user.password = encryptPassword(changedParameters.password));

                return saveData(users).then(function () {
                    return user;
                });
            } else {
                return false;
            }
        });
}

function removeUserById(id) {
    return getAllUsers()
        .then(function (users) {
            var user = findUserById(users, id);
            if (user && users.splice(users.indexOf(user), 1)) {
                return saveData(users).then(function () {
                    return user;
                });
            } else {
                return false;
            }
        })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function findUserById(users, id) {
    return users.find(function (user) {
        return user.id == id
    });
}

function saveData(data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(DATA_STORAGE, JSON.stringify(data), 'utf8', function (err) {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

function availableId(users) {
    return Number(users.map(function (user) {
            return user.id;
        }).sort(function (a, b) {
            return b - a;
        })[0]) + 1 || 1;
}

function userExist(user, users) {
    return users.find(function (u) {
        return u.username == user.username || u.email == user.email;
    })
}

function encryptPassword(password) {
    return crypto.createHmac('sha1', config.get('passwordSalt')).update(password).digest('hex');
}