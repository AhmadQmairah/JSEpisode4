/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/

function getBookById(bookId, books) {
  // Your code goes
  let x = undefined;
  books.forEach(book => {
    if (bookId === book.id) {
      console.log(book);
      x = book;
    }
  });
  console.log(x);
  return x;
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here

  let x = undefined;
  authors.forEach(author => {
    if (authorName.toUpperCase() === author.name.toUpperCase()) {
      console.log(author);
      x = author;
    }
  });
  console.log(x);
  return x;
}
/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  let x = [];
  authors.forEach(author => {
    x.push({ author: author.name, bookCount: author.books.length });
  });
  return x;
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  // Your code goes here

  books.forEach(book => {
    let color = book.color;
    if (!colors.hasOwnProperty(book.color)) {
      colors[[color]] = [];
      // colors[[color]].push([book.title]);
      // push([book.title]);
    }
    colors[[color]].push(book.title);
  });
  console.log(colors);
  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let x = [];
  let auth = getAuthorByName(authorName, authors);
  if (auth == undefined) {
    return x;
  }
  auth.books.forEach(bookid => {
    x.push(getBookById(bookid, books).title);
  });
  return x;
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here

  let x = bookCountsByAuthor(authors);
  let max = x[0];
  x.forEach(author => {
    if (author.bookCount > max.bookCount) {
      max = author;
    }
  });
  return max.author;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  let Numb = getBookById(bookId, books).authors;
  let author;
  let x;
  Numb.forEach(Au => {
    author = getAuthorByName(Au.name, authors);
    if (x == null) x = titlesByAuthorName(author.name, authors, books);
    else {
      let titles = titlesByAuthorName(author.name, authors, books);
      titles.forEach(title => x.push(title));
    }
  });

  return x;
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  let count = 0;
  let OldCount = 0;
  let MyAuthor;
  let OldBooks = [];
  authors[0].books.forEach(book => {
    OldBooks.push(book);
  });
  authors.forEach(author => {
    author.books.forEach(book => {
      if (OldBooks.includes(book)) {
        console.log(book);
        count++;
      } else {
        OldBooks.push(book);
      }
    });

    if (count >= OldCount) {
      MyAuthor = author.name;
    }
    OldCount = count;
  });
  console.log(OldBooks);
  return MyAuthor;
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

const authors = require("./authors.json");
const books = require("./books.json");
friendliestAuthor(authors);
// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));
