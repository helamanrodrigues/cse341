const express = require('express');
const router = express.Router();

const heroesController = require('../controllers/heroes');

router.get('/', heroesController.getAll);

router.get('/:id', heroesController.getSingle);

router.post('/', heroesController.createHero);

/*
router.put('/:id', heroesController.updateHero);

router.delete('/:id', heroesController.deleteHero);
*/

module.exports = router;