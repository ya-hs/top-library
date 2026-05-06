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

Book.prototype.toggleStatus = function() {
    const statuses = ["unread", "read", "in progress"];
    const currentIndex = statuses.indexOf(this.bookStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    this.bookStatus = statuses[nextIndex];
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
        const btnRemove = document.createElement("button")
        para.innerHTML = `${book.bookTitle} - ${book.bookAuthor} - ${book.bookPages} - ${book.bookStatus} - ${book.bookID}`;
        btnRemove.innerHTML = 'Remove';
        btnRemove.dataset.id = book.bookID;
        bookWrapper.append(para);
        bookWrapper.append(btnRemove);
        bookArea.append(bookWrapper);
        btnRemove.addEventListener('click', () => {
            const id = btnRemove.dataset.id;
            const index = myLibrary.findIndex ((book) => book.bookID === id);
            myLibrary.splice(index, 1);
            displayBooks();
        })
        const btnCycle = document.createElement("button");
        btnCycle.innerHTML = 'Toggle Status';
        btnCycle.dataset.id = book.bookID;
        bookWrapper.append(btnCycle);
        btnCycle.addEventListener('click', () => {
            const id = btnCycle.dataset.id;
            const index = myLibrary.findIndex ((book) => book.bookID === id);
            myLibrary[index].toggleStatus();
            displayBooks();
        })
    })
}



addBookToLibrary("The Hobbit", "Tolkien", 310, "unread");
addBookToLibrary("Dune", "Herbert", 412, "read");
displayBooks();