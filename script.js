const btnAdd = document.querySelector("#btn-add");
const bookArea = document.querySelector("#book-area");
const dialog = document.querySelector("#dialog");
const btnSubmit = document.querySelector("#btn-submit");
const btnCancel = document.querySelector("#btn-cancel");
const fTitle = document.querySelector("#book-title");
const fAuthor = document.querySelector("#book-author");
const fPages = document.querySelector("#book-pages");
const bookForm = document.querySelector("#add-book-form");
const myLibrary = [];

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

function Book(title, author, pages, status) {
    this.bookID = crypto.randomUUID();
    this.bookTitle = title;
    this.bookAuthor = author;
    this.bookPages = pages;
    this.bookStatus = status;
}

Book.prototype.toggleStatus = function () {
    const statuses = ["unread", "in progress", "read"];
    const currentIndex = statuses.indexOf(this.bookStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    this.bookStatus = statuses[nextIndex];
}

function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status));
}

function createRemoveButton(book) {
    const btnRemove = document.createElement("button")
    btnRemove.innerHTML = 'Remove';
    btnRemove.dataset.id = book.bookID;
    btnRemove.addEventListener('click', () => {
        const id = btnRemove.dataset.id;
        const index = myLibrary.findIndex((book) => book.bookID === id);
        myLibrary.splice(index, 1);
        displayBooks();
    })
    return btnRemove;
}

function createCycleButton(book) {
    const btnCycle = document.createElement("button");
    btnCycle.innerHTML = 'Toggle Status';
    btnCycle.dataset.id = book.bookID;
    btnCycle.addEventListener('click', () => {
        const id = btnCycle.dataset.id;
        const index = myLibrary.findIndex((book) => book.bookID === id);
        myLibrary[index].toggleStatus();
        displayBooks();
    })
    return btnCycle;
}

function displayBooks() {
    bookArea.innerHTML = "";
    myLibrary.forEach((book) => {
        const bookWrapper = document.createElement("div");
        const btnRemove = createRemoveButton(book);
        const btnCycle = createCycleButton(book);
        const para = document.createElement("p");
        bookWrapper.className = "book-wrapper";
        para.textContent = `${book.bookTitle} - ${book.bookAuthor} - ${book.bookPages} - ${book.bookStatus}`;
        bookWrapper.append(para);
        bookWrapper.append(btnRemove);
        bookWrapper.append(btnCycle);
        bookArea.prepend(bookWrapper);

    })
}

addBookToLibrary("The Hobbit", "Tolkien", 310, "unread");
addBookToLibrary("Dune", "Herbert", 412, "read");
displayBooks();