const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /api/auth/register — créer un compte avec un rôle
router.post('/register', async (req, res) => {
  try {
    const { username, password, role, team } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'Ce nom d\'utilisateur existe déjà' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({ username, passwordHash, role, team });
    await user.save();

    res.status(201).json({ message: 'Compte créé avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role, team: user.team },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;