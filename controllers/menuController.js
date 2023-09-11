const MenuItem = require('../models/menu');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
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
    const image = req.file.filename;

    const newItem = MenuItem.addItem(name, description, price, preparationTime, category, image);
    
    if (newItem) {
      res.redirect('/menu');
    } else {
      res.status(500).send('Error saving the item.');
    }
  });
};
