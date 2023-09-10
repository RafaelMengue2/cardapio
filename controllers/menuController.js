// controllers/menuController.js
const MenuItem = require('../models/menu');
const multer = require('multer');
const path = require('path');

// Configurar multer para lidar com o upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.showMenu = (req, res) => {
  const menu = MenuItem.getMenu();
  res.render('menu', { menu });
};

exports.showAddItemForm = (req, res) => {
  res.render('additem');
};

exports.addItem = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).send('Error uploading image.');
    }
    
    const { name, description, price, preparationTime, category } = req.body;
    const image = req.file.filename; // Nome do arquivo de imagem

    const newItem = MenuItem.addItem(name, description, price, preparationTime, category, image);
    
    // Ensure the newItem is saved properly before redirecting
    if (newItem) {
      res.redirect('/menu');
    } else {
      res.status(500).send('Error saving the item.');
    }
  });
};
