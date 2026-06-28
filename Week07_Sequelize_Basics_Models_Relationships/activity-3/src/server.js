import { DataTypes } from "sequelize";
import sequelize from "./db/database.js";

// Step 1: Define models
const Author = sequelize.define('Author', {
  name: DataTypes.STRING,
});

const Book = sequelize.define('Book', {
  title: DataTypes.STRING,
});

// Step 2: Define associations
// An author has many books, a book belongs to one author
Author.hasMany(Book);
Book.belongsTo(Author);

async function run() {
  await sequelize.sync({ force: true });

  const author = await Author.create({ name: 'Chim Samnang' });

  // Create a book from the author instance
  const book1 = await author.createBook({ title: 'Sequelize Basics' });
  console.log('Created book:', book1.title);

  // Get all books written by this author
  const books = await author.getBooks();
  console.log('Books by Chim Samnang:', books.map(b => b.title));

  // Create another book separately
  const book2 = await Book.create({ title: 'Advanced Node.js' });
  console.log('Created book separately:', book2.title);

  // Link the second book to the same author
  await book2.setAuthor(author);
  console.log('Linked book to author:', book2.title);

  // Display all books again
  const allBooks = await Book.findAll();
  console.log('All books:', allBooks.map(b => `${b.title} (Author ID: ${b.AuthorId})`));

  // Fetch all authors and for each author display their books
  const authorsWithBooks = await Author.findAll({
    include: Book
  });

  authorsWithBooks.forEach(author => {
    console.log(`Author: ${author.name}`);
    author.Books.forEach(book => {
      console.log(`  - ${book.title}`);
    });
  });

  await sequelize.close();
}

run();