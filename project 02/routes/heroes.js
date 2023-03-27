const express = require('express');
const router = express.Router();
const {requiresAuth } = require('express-openid-connect');

const heroesController = require('../controllers/heroes');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), heroesController.getAll);

router.get('/:id', requiresAuth(), heroesController.getSingle);

router.post('/', validation.saveHero, heroesController.createHero);

router.put('/:id', validation.saveHero, heroesController.updateHero);

router.delete('/:id', heroesController.deleteHero);

module.exports = router;
