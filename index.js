// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Configure express-session
app.use(session({
    secret: 'c1i2m3o4l5', // Replace with a real secret key
    resave: false,
    saveUninitialized: true,
}));

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const authController = require('./controllers/authController');
const menuController = require('./controllers/menuController');

app.get('/login', authController.showLoginForm);
app.get('/register', authController.showRegisterForm);
app.post('/register', authController.registerUser);
app.post('/login', authController.loginUser);

app.get('/menu', menuController.showMenu);
app.get('/menu/additem', menuController.showAddItemForm);
app.post('/menu/additem', menuController.addItem);

app.get('/', (req, res) => {
    res.redirect('/register');
});

// Server initialization
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
