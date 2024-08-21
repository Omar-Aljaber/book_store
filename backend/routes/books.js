const express = require('express');
const router = express.Router();
const FormData = require('form-data');

const controller = require('../controllers/booksController');
// const formData = new FormData();
// formData.append('image', image);

/* POST - create book. */
router.post('/', controller.create);

/* GET - list all books. */
router.get('/', controller.listAll);

/* GET - finde book by ID. */
router.get('/:id', controller.findeById);

/* PUT - update a book. */
router.put('/:id', controller.update);

/* PUT - add rating to the book. */
router.put('/:id', controller.rating);

/* PUT - update book availability. */
router.put('/:id', controller.availability);

/* DELETE - delete book by ID. */
router.delete('/:id', controller.delete);

module.exports = router;
