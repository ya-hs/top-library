const btnAdd = document.querySelector("#btn-add");
const bookArea = document.querySelector("#book-area");

btnAdd.addEventListener('click', () => {
    console.log("click!");
    addBook();

})

function addBook() {
    const newBook = document.createElement("div");
    const newTitle = document.createElement("h2");
    const newAuthor = document.createElement("h3");
    const newPages = document.createElement("h4");

    newBook.classList.add("book-container");
    newTitle.classList.add("book-title");
    newAuthor.classList.add("book-author");
    newPages.classList.add("book-pages");

    newTitle.textContent = "Title";
    newAuthor.textContent = "Author";
    newPages.textContent = "100 Pages";
    bookArea.appendChild(newBook);
    newBook.appendChild(newTitle);
    newBook.appendChild(newAuthor);
    newBook.appendChild(newPages);
}