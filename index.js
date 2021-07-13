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
    const StoredBooks = [
      {
        title: "The Alchemist",
        author: "‎Paulo Coelho",
        isbn: "123456",
      },
      {
        title: "Rich dad poor dad",
        author: "‎Robert T.Kiyosaki",
        isbn: "1234567",
      },
    ];
    const books = StoredBooks;
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
}
//Store Class : Handles Storage

//Event : Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event : Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Add book to UI
  UI.addBookToList(book);

  //Clear fields
  UI.clearFields();
});

//Event : Remove a Book
