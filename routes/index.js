const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/heroes', require('./heroes'));
router.use(
    '/',
    (docData = (req, res) => {
        let docData = {
            documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
        };
        res.send(docData);
    })
);

module.exports = router;