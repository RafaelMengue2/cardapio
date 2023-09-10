// controllers/authController.js
const User = require('../models/user');

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.showRegisterForm = (req, res) => {
  res.render('register');
};

exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  if (!User.findUser(username)) {
    User.addUser(username, password);
    res.redirect('/login');
  } else {
    res.redirect('/register');
  }
};

// controllers/authController.js
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = User.findUser(username);

  if (user && user.password === password) {
    req.session.username = username;
    
    // Após o login bem-sucedido, redirecione para a tela do menu
    res.redirect('/menu');
  } else {
    res.redirect('/login');
  }
};

