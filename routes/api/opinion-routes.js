const router = require('express').Router();

const {
  getAllOpinion,
  getOpinionById,
  createOpinion,
  updateOpinion,
  deleteOpinion,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllOpinion)
  .post(createOpinion);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getOpinionById)
  .put(updateOpinion)
  .delete(deleteOpinion);

// Post at /api/thoughts/:thoughtId/reactions
router
  .route('/:opinionId/reactions')
  .post(createReaction);

  router
  .route('/:opinionId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;