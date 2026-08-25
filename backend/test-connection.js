require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log('URI utilisée (longueur):', uri.length);
console.log('URI masquée:', uri.replace(/:([^:@]+)@/, ':***@'));

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connexion à MongoDB Atlas réussie !');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erreur de connexion :', err.message);
    process.exit(1);
  });
  