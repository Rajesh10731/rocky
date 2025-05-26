const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/warehouse');

const products = [
    { "name": "Herbal black oil", "image": "Herbal black oil.png", "count": 50 },
    { "name": "Moringa oil 100ml", "image": "Moringa oil 100ml.png", "count": 150 },
    { "name": "lemon hydrosol", "image": "lemon hydrosol.png", "count": 100 },
    { "name": "herbal black oil 200ml", "image": "herbal black oil 200ml(1).png", "count": 15 },
    { "name": "Avarampoo bath powder", "image": "Avarampoo bath powder.png", "count": 100 },
    { "name": "Anti acne pack", "image": "Anti acne pack.png", "count": 100 },
    { "name": "avarampoo face pack", "image": "avarampoo face pack.png", "count": 100 },
    { "name": "Baby bath powder", "image": "Baby bath powder.png", "count": 100 },
    { "name": "Banana face pack", "image": "Banana face pack.png", "count": 100 },
    { "name": "Citrullus for itchy scalp", "image": "Citrullus for itchy scalp.png", "count": 100 },
    { "name": "Citrullus oil", "image": "Citrullus oil.png", "count": 100 },
    { "name": "hair growth oil", "image": "hair growth oil.png", "count": 100 },
    { "name": "hair cleanser pack", "image": "hair cleanser pack.png", "count": 100 },
    { "name": "flaxseed", "image": "flaxseed.png", "count": 100 },
    { "name": "DEEP CONDITIONING MASK STICKER", "image": "DEEP CONDITIONING MASK STICKER.png", "count": 100 },
    { "name": "cocoa powder face pack", "image": "cocoa powder face pack.png", "count": 100 },
    { "name": "hairgrowth oil 200ml", "image": "hairgrowth oil 200ml.png", "count": 100 },
    { "name": "Herbal Anti Dandruf oil", "image": "Herbal Anti Dandruf oil.png", "count": 100 },
    { "name": "herbal anti dandruff oil 200ml", "image": "herbal anti dandruff oil 200ml.png", "count": 100 },
    { "name": "herbal hair mask", "image": "herbal hair mask.png", "count": 100 },
    { "name": "Kajal", "image": "Kajal.png", "count": 100 },
    { "name": "kids tooth powder", "image": "kids tooth powder.png", "count": 100 },
    { "name": "moringa oil 35 ml", "image": "moringa oil 35 ml.png", "count": 100 },
    { "name": "Nourishing oil Eye brow", "image": "Nourishing oil Eye brow.png", "count": 100 },
    { "name": "Orange face pack", "image": "Orange face pack.png", "count": 100 },
    { "name": "Papaya facepack", "image": "Papaya facepack.png", "count": 100 },
    { "name": "pure henna powder", "image": "pure henna powder.png", "count": 100 },
    { "name": "pure indigo powder", "image": "pure indigo powder.png", "count": 100 },
    { "name": "Rose hydrosol", "image": "Rose hydrosol.png", "count": 100 },
    { "name": "Rose petals bath powder", "image": "Rose petals bath powder.png", "count": 100 },
    { "name": "Rosemary hydrosol", "image": "rosemary hydrosol.png", "count": 100 },
    { "name": "tooth powder", "image": "tooth powder.png", "count": 100 },
    { "name": "Sesameoil front", "image": "Sesameoil front@4x.png", "count": 100 },
    { "name": "Sesameoil back", "image": "Sesameoil back@4x.png", "count": 100 },
    { "name": "Castoroil back", "image": "Castoroil back@4x.png", "count": 100 },
    { "name": "Castoroilfront", "image": "Castoroilfront@4x.png", "count": 100 },
    { "name": "Groundnutoil back", "image": "Groundnutoil back@4x.png", "count": 100 },
    { "name": "Groundnutoil front", "image": "Groundnutoil front@4x.png", "count": 100 },
    { "name": "Groundnutoil front2", "image": "Groundnutoil front@4x.png", "count": 100 }
  ]
  

Product.insertMany(products)
  .then(() => {
    console.log("Products inserted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Insert failed", err);
    mongoose.connection.close();
  });
