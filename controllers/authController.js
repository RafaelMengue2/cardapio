const User = require('../models/user');
const { query } = require('../models/database');

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.showRegisterForm = (req, res) => {
  res.render('register');
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const existingUser = await User.findUser(username);

    if (!existingUser) {
      await User.inserirUsuario(username, password);
      res.redirect('/login');
    } else {
      console.log(`User '${username}' already exists.`);
      res.redirect('/register');
    }
  } catch (error) {
    console.error('Error while registering user:', error);
    res.redirect('/register'); 
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Attempting to find user:', username);
    const user = await User.findUser(username);

    console.log('User found:', user);

    if (user && user.senha === password) {
      console.log('User authenticated. Setting session.');
      req.session.username = username;
      res.redirect('/menu');
    } else {
      console.log('User not authenticated. Redirecting to login.');
      res.redirect('/menu');
    }
  } catch (error) {
    console.error('Error while logging in:', error);
    res.redirect('/login'); // Handle the error gracefully
  }
};


