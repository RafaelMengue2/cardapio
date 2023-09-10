// models/user.js
const users = [];

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static addUser(username, password) {
    const user = new User(username, password);
    users.push(user);
    return user;
  }

  static findUser(username) {
    return users.find(user => user.username === username);
  }
}

module.exports = User;
