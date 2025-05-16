const pool = require("./pool");

async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM my_books");
  return rows;
}
async function getAllAuthors(){
  const {rows} =await pool.query("SELECT * FROM authors");
  return rows;
}
async function getAllGenres(){
  const {rows} =await pool.query("SELECT * FROM genres");
  return rows;
}
async function insertBook(title,description,year_published,rating) {
  await pool.query("INSERT INTO my_books (title,description,year_published,rating) VALUES ($1,$2,$3,$4)", [title,description,year_published,rating]);
}
async function insertAuthor(name,bio,birth_year){
    await pool.query("INSERT INTO authors (name,bio,birth_year)VALUES ($1,$2,$3)",[name,bio,birth_year]);
}
async function insertGenre(name,description){
    await pool.query("INSERT INTO genres (name,description)VALUES ($1,$2)",[name,description]);
}


module.exports = {
  insertBook,insertAuthor,insertGenre,getAllAuthors,getAllBooks,getAllGenres
};
