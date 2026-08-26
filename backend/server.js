require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB:', err.message));

app.use('/api/incidents', require('./routes/incidents'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.send('API NetOps Dashboard — OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));