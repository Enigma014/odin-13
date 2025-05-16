#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
-- Drop tables if they exist (for reseeding)
DROP TABLE IF EXISTS book_authors, book_genres, my_books, genres, authors;

-- Create my_books table
CREATE TABLE my_books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    year_published INT,
    rating NUMERIC(2,1)
);

-- Create genres table
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

-- Create authors table
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    birth_year INT
);

-- Create join table: book_genres
CREATE TABLE book_genres (
    book_id INT REFERENCES my_books(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id)
);

-- Create join table: book_authors
CREATE TABLE book_authors (
    book_id INT REFERENCES my_books(id) ON DELETE CASCADE,
    author_id INT REFERENCES authors(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

-- Insert dummy books
INSERT INTO my_books (title, description, year_published, rating) VALUES
  ('Sapiens', 'A brief history of humankind.', 2011, 4.8),
  ('1984', 'Dystopian novel about surveillance.', 1949, 4.7),
  ('The Hobbit', 'A fantasy adventure by Tolkien.', 1937, 4.6);

-- Insert dummy genres
INSERT INTO genres (name, description) VALUES
  ('History', 'Books about past events and people.'),
  ('Dystopian', 'Fiction about totalitarian societies.'),
  ('Fantasy', 'Magic and fantastical worlds.');

-- Insert dummy authors
INSERT INTO authors (name, bio, birth_year) VALUES
  ('Yuval Noah Harari', 'Israeli historian and author of Sapiens.', 1976),
  ('George Orwell', 'English novelist and journalist.', 1903),
  ('J.R.R. Tolkien', 'English writer, poet, and professor.', 1892);

INSERT INTO book_genres (book_id, genre_id) VALUES
  (1, 1),  -- Sapiens -> History
  (2, 2),  -- 1984 -> Dystopian
  (3, 3);  -- The Hobbit -> Fantasy

-- Link books to authors
INSERT INTO book_authors (book_id, author_id) VALUES
  (1, 1),  -- Sapiens -> Harari
  (2, 2),  -- 1984 -> Orwell
  (3, 3);  -- The Hobbit -> Tolkien

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://qaziizma@localhost:5432/books",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
