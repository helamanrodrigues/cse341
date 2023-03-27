const validator = require('../helpers/validate');

const saveHero = (req, res, next) => {
  const validationRule = {
    heroName: 'required|string',
    humanName: 'required|string',
    superPower: 'required|string',
    normalJob: 'required|string',
    romanticPartner: 'required|string',
    worstEnemy: 'required|string',
    company: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveVillain = (req, res, next) => {
  const validationRule1 = {
    villainName: 'required|string',
    humanName: 'required|string',
    superPower: 'required|string',
    normalJob: 'required|string',
    worstHero: 'required|string',
    company: 'string'
  };
  validator(req.body, validationRule1, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveHero,
  saveVillain
};
