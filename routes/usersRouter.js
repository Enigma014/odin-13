const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

// Home page — view all books, authors, and genres (optional: separate or combined routes)
router.get("/",controller.indexGet);
router.get("/books", controller.booksGet);
router.get("/authors", controller.AuthorsGet);
router.get("/genres", controller.GenresGet);

// Search routes
router.get("/search",controller.searchGet);
router.get("/search/book", controller.booksListGet);
router.get("/search/author", controller.authorsListGet);
router.get("/search/genre", controller.GenresListGet);

// Create book
router.get("/book/new", controller.createBookGet);
router.post("/books", controller.createBooksPost);

// Create author
router.get("/author/new", controller.createAuthorGet);
router.post("/author", controller.createAuthorPost);

// Create genre
router.get("/genre/new", controller.createGenreGet);
router.post("/genre", controller.createGenrePost);

// Delete routes (use query or body to specify what to delete)
router.get("/delete",controller.deleteGet);
router.post("/delete/book", controller.booksDeletePost);
router.post("/delete/author", controller.authorsDeletePost);
router.post("/delete/genre", controller.genresDeletePost);

  
module.exports = router;
