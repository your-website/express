const router = require('express').Router();

router.use('/', require('./users'));
router.use('/', require('./cards'));

module.exports = router;
