const express = require('express');
const router = express.Router();
const {requiresAuth } = require('express-openid-connect');

const villainsController = require('../controllers/villains');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), villainsController.getAll);

router.get('/:id', requiresAuth(), villainsController.getSingle);

router.post('/', validation.saveVillain, villainsController.createVillain);

router.put('/:id', validation.saveVillain, villainsController.updateVillain);

router.delete('/:id', villainsController.deleteVillain);

module.exports = router;
