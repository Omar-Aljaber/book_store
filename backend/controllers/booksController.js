const book = require('../models/books');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
      },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});
// exports.storageImage = upload.single('image'), (req, res) => {
//     book.create({
//         image: {
//             filename: req.file.originalname,
//             path: req.file.path,
//         }
//     })
//     .then(image => {
//         res.json(image);
//     })
//     .catch(err => {
//         res.status(422).send(err);
//     });
// };

/* POST - add book. */
exports.create = (req, res, next) => {
    book.create({
        image: null,
        title: req.body.title,
        publisher: req.body.publisher,
        category: req.body.category,
        dateOfPublish: req.body.dateOfPublish,
        availability: req.body.availability,
        review: req.body.review,
        view: req.body.view,
        description: req.body.description,
    })
    .then(book => {
        res.json(book);
    })
    .catch(err => {
        res.status(422).send(err);
    });
};

/* GET - list all books. */
exports.listAll = (req, res, next) => {
    book.find()
        .then(books => {
            res.send(books);
        })
        .catch(err => {
            send.status(422).send(err);
        });
};

/* GET - finde book by ID. */
exports.findeById = (req, res, next) => {
    book.findById(req.params.id)
        .then(book => {
            res.send(book);
        })
        .catch(err => {
            send.status(422).send(err);
        });
};

/* PUT - update a book. */
exports.update = (req, res, next) => {
    let data = {
        image: null,
        title: req.body.title,
        publisher: req.body.publisher,
        category: req.body.category,
        dateOfPublish: req.body.dateOfPublish,
        availability: req.body.availability,
        review: req.body.review,
        view: req.body.view,
        description: req.body.description,
    }
    book.findOneAndUpdate(req.params.id, data)
        .then(updated => {
            if(!updated) return res.status(404).send();
            res.json({message: "book updated seccessfully!"});
        })
        .catch(err => {
            send.status(422).send(err);
        });
};

/* PUT - add a comment to the book. */
exports.writeComment = (req, res, next) => {
    let comment = {
        content: req.body.comment
    }
    let data = {
        comment: comment
    }
    book.findOneAndUpdate(req.params.id, data)
        .then(updated => {
            if(!updated) return res.status(404).send();
            res.json({message: "comment added seccessfully!"});
        })
        .catch(err => {
            send.status(422).send(err);
        });
};

/* PUT - add rating to the book. */
exports.rating = (req, res, next) => {
    let data = {
        rating: req.body.rating
    }
    book.findOneAndUpdate(req.params.id, data)
        .then(updated => {
            if(!updated) return res.status(404).send();
            res.json({message: "rating added seccessfully!"});
        })
        .catch(err => {
            send.status(422).send(err);
        });
};

/* PUT - update book availability. */
exports.availability = (req, res, next) => {
    let data = {
        availability: req.body.availability
    }
    book.findOneAndUpdate(req.params.id, data)
        .then(updated => {
            if(!updated) return res.status(404).send();
            res.json({message: "availability added seccessfully!"});
        })
        .catch(err => {
            send.status(422).send(err);
        });
};

/* DELETE - delete book by ID. */
exports.delete = (req, res, next) => {
    book.findByIdAndRemove(req.params.id)
        .then(deleted => {
            if(!deleted) return res.status(404).send();
            res.json({message: "book deleted seccessfully!"});
        })
        .catch(err => {
            send.status(422).send(err);
        });
};
