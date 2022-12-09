// VARIABLES

// Select element from the dom
const bookShelf = document.querySelector('.book-shelf');
const addBookForm = document.querySelector('.add-book-form');

// FUNCTIONS
// Function to display date
const date = document.querySelector('.date');
const displayDate = () => {
  const today = new Date();
  let month = today.getMonth();
  const day = today.getDate();
  const year = today.getFullYear();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const seconds = today.getSeconds();

  switch (month) {
    case 0:
      month = 'Jan';
      break;
    case 1:
      month = 'Feb';
      break;
    case 2:
      month = 'Mar';
      break;
    case 3:
      month = 'Apr';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'Jun';
      break;
    case 6:
      month = 'Jul';
      break;
    case 7:
      month = 'Aug';
      break;
    case 8:
      month = 'Sep';
      break;
    case 9:
      month = 'Oct';
      break;
    case 10:
      month = 'Nov';
      break;
    case 11:
      month = 'Dec';
      break;
  }

  let suffix;
  switch (day) {
    case 1:
      suffix = 'st';
      break;
    case 2:
      suffix = 'nd';
      break;
    case 3:
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
      break;
  }

  const time = (hour > 12) ? (`${month} ${day}${suffix} ${year}, ${hour - 12}:${minute}:${seconds} pm`) : (`${month} ${day}${suffix} ${year}, ${hour}:${minute}:${seconds} am`);
  date.textContent = time;
};

displayDate();

// CLASSES
// Add Book class as a template to create books
class Book {
  constructor(_title, _author, _bookId) {
    this.title = _title;
    this.author = _author;
    this.bookId = _bookId;
  }
}

// Add a class for views manipulation
class Views {
  static displayBooks() {
    const bookCover = BookPersistence.getLSContent();
    bookCover.forEach((book) => Views.addBook(book));
  }

  static addBook(book) {
    // Create elements required for individual book
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const conjunction = document.createElement('span');
    const bookCover = document.createElement('div');
    const bookId = document.createElement('span');
    const delBtn = document.createElement('button');

    // Assigning class, attributes and text content to the elements
    bookCard.className = 'book';
    bookShelf.className = 'book-shelf';
    bookTitle.className = 'book-title';
    bookTitle.textContent = `"${book.title}"`;
    bookAuthor.className = 'book-author';
    bookAuthor.textContent = book.author;
    conjunction.className = 'conjunction';
    conjunction.textContent = 'by';
    bookCover.className = 'book-cover';
    bookId.innerText = book.bookId;
    bookId.setAttribute('style', 'display: none;');
    delBtn.className = 'delete-button btn';
    delBtn.setAttribute('type', 'button');
    delBtn.textContent = 'Delete Book';

    // Build a book card and attach it to the library
    bookCover.append(bookTitle, conjunction, bookAuthor);
    bookCard.append(bookCover, bookId, delBtn);
    bookShelf.appendChild(bookCard);
  }

  static clearInputField() {
    document.querySelector('input#book-title').value = '';
    document.querySelector('input#book-author').value = '';
  }

  static removeBookDOM(item) {
    if (item.classList.contains('delete-button')) {
      item.parentElement.remove();
    }
  }
}

class BookPersistence {
  static getLSContent() {
    let LSContent;
    if (localStorage.getItem('books') === null) {
      LSContent = [];
    } else {
      LSContent = JSON.parse(localStorage.getItem('books'));
    }
    return LSContent;
  }

  static addBookToLS(element) {
    const AwesomeBookDB = BookPersistence.getLSContent();
    AwesomeBookDB.push(element);
    localStorage.setItem('books', JSON.stringify(AwesomeBookDB));
  }

  static removeBookLS(id) {
    const newLSContent = BookPersistence.getLSContent();
    newLSContent.forEach((book, i, Arr) => {
      if (book.bookId === id) {
        Arr.splice(i, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(newLSContent));
  }
}

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', Views.displayBooks);

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('input#book-title').value;
  const author = document.querySelector('input#book-author').value;
  const bookId = Math.random();

  const book = new Book(title, author, bookId);
  Views.addBook(book);
  Views.clearInputField();
  BookPersistence.addBookToLS(book);
});

bookShelf.addEventListener('click', (e) => {
  Views.removeBookDOM(e.target);
  const idItemToRemove = Number(e.target.previousSibling.innerText);
  BookPersistence.removeBookLS(idItemToRemove);
});

// SINGLE PAGE APP
const list = document.querySelector('#list');
const addBook = document.querySelector('#add-book');
const contact = document.querySelector('#contact');

const loadContent = () => {
  const mySPA = document.querySelector('#mySPA');
  const idMinusHash = location.hash.slice(1);
  mySPA.innerHTML = idMinusHash;
};

if (!location.hash) {
  location.hash = '#list';
}

loadContent();
window.addEventListener('hashchange', loadContent);
