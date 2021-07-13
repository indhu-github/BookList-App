//Book Class : Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class : Handles UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    //to use variables inside a string, we use backticks
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static deleteBook(targetElem) {
    if (targetElem.classList.contains("delete")) {
      targetElem.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    //disappear in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
}

//Store Class : Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    //we need to stringify the object before storing into the localstorage
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
        console.log("deleted");
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
//Event : Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event : Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Validate
  if (title == "" || author == "" || isbn == "") {
    UI.showAlert("Please fill all the fields", "danger");
  } else {
    //Instantiate book
    const book = new Book(title, author, isbn);

    //Add book to UI
    UI.addBookToList(book);

    //Store book to localstorage
    Store.addBook(book);

    //show success message
    UI.showAlert("Successfully added the book", "success");

    //Clear fields
    UI.clearFields();
  }
});

//Event : Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  //console.log(e.target);

  UI.deleteBook(e.target);
  //console.log(e.target.parentElement.previousElementSibling.textContent);

  //delete book from localstorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show success message
  UI.showAlert("Successfully deleted the book", "success");
});
