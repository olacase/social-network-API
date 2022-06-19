const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./opinion-routes');

router.use('/users', userRoutes);
router.use('/opinion', thoughtRoutes);

module.exports = router;