const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('villains')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid villain id to find a villain.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('villains')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createVillain = async (req, res) => {
  const villain = {
    villainName: req.body.villainName,
    humanName: req.body.humanName,
    superPower: req.body.superPower,
    normalJob: req.body.normalJob,
    worstHero: req.body.worstHero,
    company: req.body.company
  };
  const response = await mongodb.getDb().db().collection('villains').insertOne(villain);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the villain.');
  }
};

const updateVillain = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid villain id to update a villain.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const villain = {
    villainName: req.body.villainName,
    humanName: req.body.humanName,
    superPower: req.body.superPower,
    normalJob: req.body.normalJob,
    worstHero: req.body.worstHero,
    company: req.body.company
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('villains')
    .replaceOne({ _id: userId }, villain);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the villain.');
  }
};

const deleteVillain = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid villain id to delete a villain.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('villains').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the villain.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createVillain,
  updateVillain,
  deleteVillain
};
