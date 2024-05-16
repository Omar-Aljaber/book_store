const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

/* POST - create users. */
router.post('/', controller.create);

/* GET - get all users. */
router.get('/', controller.listAll);

/* GET - finde user by ID. */
router.get('/:id', controller.findeById);

/* GET - finde user by email & password. */
router.get('/:id', controller.findOne);

/* PUT - finde user by ID & update it. */
router.put('/:id', controller.update);

/* DELETE - delete user by ID. */
router.delete('/:id', controller.delete);


module.exports = router;
