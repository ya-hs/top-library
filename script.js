const addButton = document.querySelector("#btn-add");
const bookArea = document.querySelector("#book-area");
const dialog = document.querySelector("#dialog");
const submitButton = document.querySelector("#btn-submit");
const cancelButton = document.querySelector("#btn-cancel");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#book-pages");
const bookForm = document.querySelector("#add-book-form");
const myLibrary = [];

addButton.addEventListener('click', () => {
    console.log("click!");
    dialog.showModal();
})

cancelButton.addEventListener('click', () => {
    console.log("cancel!");
    dialog.close();
})

submitButton.addEventListener('click', () => {
    event.preventDefault();
    console.log("submit!");
    const fStatus = document.querySelector('input[name="book-status"]:checked');
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, fStatus.value);
    displayBooks();
    dialog.close();
    bookForm.reset();
}
)

function Book(title, author, pages, status) {
    this.bookId = crypto.randomUUID();
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
    btnRemove.dataset.id = book.bookId;
    btnRemove.className = "btn-remove";
    btnRemove.addEventListener('click', () => {
        const id = btnRemove.dataset.id;
        const index = myLibrary.findIndex((book) => book.bookId === id);
        myLibrary.splice(index, 1);
        displayBooks();
    })
    return btnRemove;
}

function createCycleButton(book) {
    const btnCycle = document.createElement("button");
    btnCycle.innerHTML = 'Toggle Status';
    btnCycle.dataset.id = book.bookId;
    btnCycle.className = "btn-cycle";
    btnCycle.addEventListener('click', () => {
        const id = btnCycle.dataset.id;
        const index = myLibrary.findIndex((book) => book.bookId === id);
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
        const spanTitle = document.createElement("span");
        const spanAuthor = document.createElement("span");
        const spanPages = document.createElement("span");
        const spanStatus = document.createElement("span");
        bookWrapper.className = "book-wrapper";
        spanTitle.textContent = book.bookTitle;
        spanAuthor.textContent = book.bookAuthor;
        spanPages.textContent = book.bookPages;
        spanStatus.textContent = book.bookStatus;
        bookWrapper.append(spanTitle);
        bookWrapper.append(spanAuthor);
        bookWrapper.append(spanPages);
        bookWrapper.append(spanStatus);
        bookWrapper.append(btnCycle);
        bookWrapper.append(btnRemove);
        bookArea.prepend(bookWrapper);

    })
}

addBookToLibrary("The Hobbit", "Tolkien", 310, "unread");
addBookToLibrary("Dune", "Herbert", 412, "read");
displayBooks();