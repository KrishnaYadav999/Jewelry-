const express = require('express');
const router = express.Router();

router.get('/check-session', (req, res) => {
  res.json({ session: req.session });
});

module.exports = router;
