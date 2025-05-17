const db = require("../db/queries");
const pool = require("../db/pool");

async function booksListGet(req, res) {
  try {
    const search = req.query.search;
    console.log("Search term:", search); 
    let result={ rows: [] };

    if (search) {
      result = await pool.query(
        "SELECT * FROM my_books WHERE title ILIKE $1",[`%${search}%`])
      console.log("Search results:", result.rows);
     }
     

     res.render("booksList", {
      title: "Book List",
      books: result.rows,
      search: search || "",
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
async function booksDeletePost  (req, res) {
  try {
    const { title } = req.body;
    await pool.query("DELETE FROM my_books WHERE title ILIKE $1",[`%${title}%`]);
    
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete all users");
  }
};
async function authorsListGet(req, res) {
  try {
    const search = req.query.search;
    console.log("Search term:", search); 
    let result={ rows: [] };

    if (search) {
      result = await pool.query(
        "SELECT * FROM authors WHERE name ILIKE $1",
  [`%${search}%`])
      console.log("Search results:", result.rows);
     }
     

     res.render("authorsList", {
      title: "Author List",
      authors: result.rows,
      search: search || "",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
async function authorsDeletePost  (req, res) {
  try {
    const { name } = req.body;
    await pool.query("DELETE FROM authors WHERE name ILIKE $1",[`%${name}%`]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete all users");
  }
};
async function GenresListGet(req, res) {
  try {
    const search = req.query.search;
    console.log("Search term:", search); 
    let result={ rows: [] };

    if (search) {
      result = await pool.query(
        "SELECT * FROM genres WHERE name ILIKE $1",
  [`%${search}%`])
      console.log("Search results:", result.rows);
     }
     

     res.render("genresList", {
      title: "Genre List",
      genres: result.rows,
      search: search || "",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
async function genresDeletePost  (req, res) {
  try {
    const { name } = req.body;
    await pool.query("DELETE FROM genres WHERE name ILIKE $1",[`%${name}%`]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete all users");
  }
};
async function indexGet(req,res){
  res.render("index");
}
async function searchGet(req,res){
  res.render("search");
}
async function updateGet(req,res){
  res.render("update");
}
async function booksGet(req, res) {
  try {
    const books = await db.getAllBooks();
    console.log("Books: ", books);
    
    res.status(200).json({
      message: "Books:",
      books: books
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
}
async function AuthorsGet(req, res) {
  try {
    const authors = await db.getAllAuthors();
    console.log("Authors: ", authors);
    
    res.status(200).json({
      message: "Authors:",
      authors: authors
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch authors" });
  }
}
async function GenresGet(req, res) {
  try {
    const genres = await db.getAllGenres();
    console.log("Genre: ", genres);
    
    res.status(200).json({
      message: "Genre:",
      genres: genres
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
}

async function createBookGet(req, res) {
  // render the form
  res.render("books");
}
async function deleteGet(req, res) {
  // render the form
  res.render("delete");
}

async function createBooksPost(req, res) {
  const { title,description,year_published,rating } = req.body;
  await db.insertBook(title,description,year_published,rating);
  res.redirect("/");
}
async function createAuthorGet(req,res){
    res.render("author");
}
async function createAuthorPost(req, res) {
    const { name,bio,birth_year } = req.body;
    await db.insertAuthor(name,bio,birth_year);
    res.redirect("/");
}
async function createGenreGet(req,res){
    res.render("genre");
}
async function createGenrePost(req, res) {
    const { name,description } = req.body;
    await db.insertGenre(name,description);
    res.redirect("/");
}
async function booksUpdatePost  (req, res) {
  try {
    const { title,update } = req.body;
    await pool.query("UPDATE my_books SET title = $1  WHERE title ILIKE $2",[update,`%${title}%`]);
    
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete all users");
  }
};
async function genresUpdatePost  (req, res) {
  try {
    const { name,update } = req.body;
    await pool.query("UPDATE genres SET name = $1  WHERE name ILIKE $2",[update,`%${name}%`]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update all users");
  }
};
async function authorsUpdatePost  (req, res) {
  try {
    const { name,update } = req.body;
    await pool.query("UPDATE authors SET name = $1  WHERE name ILIKE $2",[update,`%${name}%`]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update all users");
  }
};
module.exports = {
  booksGet, booksListGet, booksDeletePost,
  authorsListGet, authorsDeletePost,
  GenresListGet, genresDeletePost,
  AuthorsGet, GenresGet,
  createBookGet, createBooksPost,
  createAuthorGet, createAuthorPost,
  createGenreGet, createGenrePost,indexGet,deleteGet,searchGet,updateGet,authorsUpdatePost,booksUpdatePost,genresUpdatePost
};

