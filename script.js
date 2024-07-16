const btnAdd = document.querySelector("#btn-add");
const book = document.querySelectorAll(".book");
let bookText = "";
book.textContent = bookText;

btnAdd.addEventListener('click', () => {
    addTextToBook();
})

function addTextToBook() {
    bookText = "test";
    book.textContent = bookText;
}