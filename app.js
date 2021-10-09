// Creating variable for Google Books API URL
const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";

//Dom select
const grid = document.querySelector(".book-grid");
const button = document.querySelector(".search-button");
const input = document.querySelector(".form-input");

// Function to fetch API data
const getBooks = async (title) => {
    const response = await fetch(`${BOOKS_URL}${title}`);
    const data = await response.json();
    console.log(data);
    return data.data;
};
getBooks("newcastle");

// Functions to creae node and append that to our parent html element
function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}

//create an on click event that will grab our input and create new elements
button.addEventListener("click", async (event) => {
    const bookSearch = input.value; // .value grabs the text from input

    if (!bookSearch) {
        alert("please insert valid text");
        return;
    }
    const books = await getBooks(title); // grabbing the data from api
});

//array keys under volumeInfo{} = image, author, title, description
//books.volumeInfo.imageLinks
//books.volumeInfo.authors
//books.volumeInfo.title
//books.volumeInfo.description

// once we have populateed grid, use modal for pop ups when clicking on a book
