var fs       = require('fs'),
    path     = require('path'),
    fileName = path.resolve(__dirname) + '/../op.json',
    opFile   = JSON.parse(fs.readFileSync(fileName, 'utf8'));

module.exports = {
    isUserOp: function(username, cb) {
        return cb(opFile.indexOf(username) > -1);
    },
    addUser: function(username, cb) {
        var index = opFile.indexOf(username);
        if(index > -1) {
            return cb(false);
        }

        opFile.push(username);
        fs.writeFile(fileName, JSON.stringify(opFile), function (err) {
            if (err) {
                console.log(err);
            }
            return cb(true);
        });
    },
    deleteUser: function(username, cb) {
        var index = opFile.indexOf(username);

        if(index <= -1) {
            return cb(false);
        }

        opFile.splice(index, 1);
        fs.writeFile(fileName, JSON.stringify(opFile), function (err) {
            if (err) {
                console.log(err);
            }
            return cb(true);
        });
    },
    getUsers: function() {
        return opFile;
    }
};