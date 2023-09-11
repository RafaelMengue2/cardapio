const User = require('../models/user');

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.showRegisterForm = (req, res) => {
  res.render('register');
};

exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  const existingUser = User.findUser(username);

  if (!existingUser) {
    User.inserirUsuario(username, password);
    console.log(`User '${username}' registered successfully.`);
    res.redirect('/login');
  } else {
    console.log(`User '${username}' already exists.`);
    res.redirect('/register');
  }
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = User.findUser(username);

  if (user && user.password === password) {
    req.session.username = username;
    
    res.redirect('/menu');
  } else {
    res.redirect('/login');
  }
};

