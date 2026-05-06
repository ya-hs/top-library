const btnAdd = document.querySelector("#btn-add");
const bookArea = document.querySelector("#book-area");
const dialog = document.querySelector("#dialog");
const btnSubmit = document.querySelector("#btn-submit");
const btnCancel = document.querySelector("#btn-cancel");
const fTitle = document.querySelector("#book-title");
const fAuthor = document.querySelector("#book-author");
const fPages = document.querySelector("#book-pages");
const bookForm = document.querySelector("#add-book-form");

btnAdd.addEventListener('click', () => {
    console.log("click!");
    dialog.showModal();
})

btnCancel.addEventListener('click', () => {
    console.log("cancel!");
    dialog.close();
})

btnSubmit.addEventListener('click', () => {
    event.preventDefault();
    console.log("submit!");
    const fStatus = document.querySelector('input[name="book-status"]:checked');
    addBookToLibrary(fTitle.value, fAuthor.value, fPages.value, fStatus.value);
    displayBooks();
    dialog.close();
    bookForm.reset();
}
)

const myLibrary = [];

function Book(title, author, pages, status) {
    this.bookID = crypto.randomUUID();
    this.bookTitle = title;
    this.bookAuthor = author;
    this.bookPages = pages;
    this.bookStatus = status;
}

function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status));
}

function displayBooks() {
    bookArea.innerHTML = "";
    myLibrary.forEach((book) => {
        const bookWrapper = document.createElement("div");
        bookWrapper.className = "book-wrapper";
        const para = document.createElement("p");
        const btn = document.createElement("button")
        para.innerHTML = `${book.bookTitle} - ${book.bookAuthor} - ${book.bookPages} - ${book.bookStatus} - ${book.bookID}`;
        btn.innerHTML = 'Remove';
        btn.dataset.id = book.bookID;
        bookWrapper.append(para);
        bookWrapper.append(btn);
        bookArea.append(bookWrapper);
    })
}

addBookToLibrary("The Hobbit", "Tolkien", 310, false);
addBookToLibrary("Dune", "Herbert", 412, true);
displayBooks();