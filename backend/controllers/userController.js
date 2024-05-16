const User = require('../models/user');

/* POST - create users. */ 
exports.create = (req, res, next) => {
  User.create({
    name: req.body.name, //TODO => first- and lastname
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(422).send(err);
    })
};

/* GET - get users. */
exports.listAll = (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(422).send(err);
     })
};

/* GET - finde user by ID. */
exports.findeById = (req, res, next) => {
  User.findById(req.params.id)
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(422).send(err);
    })
};

/* GET - finde user by email & password. */
exports.findOne = (req, res, next) => {
  User.findOne({email: req.body.email, password: req.body.password})
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(422).send(err);
    })
};

/* PUT - finde user by ID & update it. */
exports.update = (req, res, next) => {
  let data = {
    email: req.body.email,
    password: req.body.password
  }
  User.findByIdAndUpdate(req.params.id, data)
    .then(updatedUser => {
      if(!updatedUser) return res.status(404).send();
      res.json(updatedUser);
    })
    .catch(err => {
      res.status(422).send(err);
    })
};

/* DELETE - delete user by ID. */
exports.delete = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(deleted => {
      if(!deleted) return res.status(404).send()
      res.json({message: "User deleted"});
    })
    .catch(err => {
      res.status(422).send(err);
    })
};
