const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3019;

app.use(session({
    secret: 'c1i2m3o4l5',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
