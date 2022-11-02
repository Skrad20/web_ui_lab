
const fs = require("fs");

function readUser() {
    const filePath = __dirname + "/data/users.json";
    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    return users
}

function writeUser(new_users) {
    const filePath = __dirname + "/data/users.json";
    data = JSON.stringify(new_users);
    fs.writeFileSync(filePath, data);
}

module.exports = { readUser, writeUser };
