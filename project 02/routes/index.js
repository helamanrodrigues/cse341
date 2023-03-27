const express = require('express');
const router = express.Router();

const { requiresAuth } = require('express-openid-connect');

// Auth0 test routes

router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

router.use('/', require('./swagger'));
router.use('/heroes', require('./heroes'));
router.use('/villains', require('./villains'));

module.exports = router;
