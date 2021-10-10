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

// console.log(bookTitle);
// Reusable DOM Functions
function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}
function textNode(text) {
    return document.createTextNode(text);
}

//create an on click event that will grab our input and create new elements
button.addEventListener("click", async (event) => {
    const title = input.value; // .value grabs the text from input
    console.log(title);
    if (!title) {
        alert("please insert valid book");
        return;
    }
    const books = await getBooks(title); // grabbing the data from api

    const bookItems = books.map((book) => {
        const element = createNode("p");
        const bookTitle = `${book.volumeInfo.title}`;
        const bookAuthor = `${book.volumeInfo.authors}`;
        const bookDescription = `${book.volumeInfo.description}`;
        console.log(bookTitle);

        const textNodeTitle = textNode(bookTitle);
        const textNodeAuthor = textNode(bookAuthor);
        const textNodeDescription = textNode(bookDescription);

        append(element, textNodeTitle);
        append(element, textNodeAuthor);
        append(element, textNodeDescription);

        console.log(element);
        return element;
    });

    // attaching the elements to grid

    // bookItems.forEach((e) => {
    //     append(grid, e);
    // });

    const append = (parent) => (child) => parent.appendChild(child);
    bookItems.forEach(append(grid));
});

//array keys under volumeInfo{} = image, author, title, description
//books.volumeInfo.imageLinks
//books.volumeInfo.authors
//books.volumeInfo.title
//books.volumeInfo.description

// once we have populateed grid, use modal for pop ups when clicking on a book
