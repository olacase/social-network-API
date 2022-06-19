const router = require('express').Router();
// Import all of the API routes from /api
const apiRoutes = require('./routes/api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1> 404 Error!</h1>');
});

module.exports = router;