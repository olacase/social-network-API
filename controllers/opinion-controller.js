const { User, opinion} = require('../models');

const opinionController = {
 

  // get all opinions
  getAllopinion(req, res) {
    opinion.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbOpinionData => res.json(dbOpinionData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get each by id
  getOpinionById({ params }, res) {
    opinion.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbOpiniontData => {
        if (!dbOpinionData) {
          res.status(404).json({ message: 'No user opinions found with that id!' });
          return;
        }
        res.json(dbOpinionData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createOpinion({ body }, res) {
    opinion.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { opinion: _id } },
                { new: true }
            );
        })
        .then(dbOpinionData => {
            if (!dbOpinionData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbOpinionData);
        })
        .catch(err => res.json(err));
},

  // update opinions by id
  updateOpinion({ params, body }, res) {
    opinion.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbOpinionData => {
        if (!dbOpinionData) {
          res.status(404).json({ message: 'No opinions found with that id!' });
          return;
        }
        res.json(dbOpinionData);
      })
      .catch(err => res.json(err));
  },

  // delete by ID
  deleteOpinion({ params }, res) {
    opinion.findOneAndDelete({ _id: params.id })
      .then(dbOpinionData => {
        if (!dbOpinionData) {
          res.status(404).json({ message: 'No opinions found with that id!' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: parmas.userId },
          { $pull: { opinion: params.Id } },
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  createReaction({params, body}, res) {
    opinion.findOneAndUpdate(
      {_id: params.opinionId}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbOpinionData => {
        if (!dbOpinionData) {
            res.status(404).json({message: 'No opinions with this ID.'});
            return;
        }
        res.json(dbOpinionData);
    })
    .catch(err => res.status(400).json(err))
},

  deleteReaction({ params }, res) {
    opinion.findOneAndUpdate(
      { _id: params.opinionId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbopinionData => {
        if (!dbOpinionData) {
          res.status(404).json({ message: 'Nope!'});
          return;
        }
       res.json(dbOpinionData);
      })
      .catch(err => res.json(err));
  }


};

module.exports = opinionController