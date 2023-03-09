const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('heroes').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection('heroes')
        .find({_id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createHero = async (req, res) => {
    const hero = {
        heroName: req.body.heroName,
        humanName: req.body.humanName,
        superPower: req.body.superPower,
        normalJob: req.body.normalJob,
        romanticPartner: req.body.romanticPartner,
        worstEnemy: req.body.worstEnemy,
        company: req.body.company
    };
    const response = await mongodb.getDb().db().collection('heroes').insertOne(hero);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateHero = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const hero = {
        heroName: req.body.heroName,
        humanName: req.body.humanName,
        superPower: req.body.superPower,
        normalJob: req.body.normalJob,
        romanticPartner: req.body.romanticPartner,
        worstEnemy: req.body.worstEnemy,
        company: req.body.company
    };

    const response = await mongodb.getDb().db().collection('heroes').replaceOne({ _id: userId }, hero);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the hero.');
    }
};

const deleteHero = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('heroes').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the hero.');
    }
};


module.exports = { getAll, getSingle, createHero, updateHero, deleteHero };