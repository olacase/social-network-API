const router = require('express').Router();
const userRoutes = require('./user-routes');
const opinionRoutes = require('./opinion-routes');

router.use('/users', userRoutes);
router.use('/opinion', opinionRoutes);

module.exports = router;