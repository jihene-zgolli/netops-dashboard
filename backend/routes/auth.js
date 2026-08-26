const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ADMIN = {
  username: 'admin',
  passwordHash: bcrypt.hashSync('admin123', 10)
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN.username || !bcrypt.compareSync(password, ADMIN.passwordHash)) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;