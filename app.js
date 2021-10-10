// Creating variable for Google Books API URL
const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";

//Dom select
const grid = document.querySelector(".book-grid");
const button = document.querySelector(".search-button");
const input = document.querySelector(".form-input");
const list = document.querySelector(".books-grid-list");

// Function to fetch API data
const getBooks = async (title) => {
    const response = await fetch(`${BOOKS_URL}${title}&maxResults=5`);
    const data = await response.json();
    return data.items;
};

console.log(getBooks("newcastle"));

// Reusable DOM Functions

function createNode(element) {
    return document.createElement(element);
}
function textNode(text) {
    return document.createTextNode(text);
}
// function append(parent, el) {
//     return parent.appendChild(el);
// }

//create an on click event that will grab our input and create new elements
button.addEventListener("click", async (event) => {
    const input = document.querySelector("#form-input");
    const title = input.value; // .value grabs the text from input
    console.log(title);
    if (!title) {
        alert("please insert valid book");
        return;
    }
    const books = await getBooks(title); // grabbing the data from api

    const bookItems = books.map((book) => {
        const element = createNode("li");
        //element.classList.add("addclassname");
        // add classlist to element to style
        //create element <br> to split up elements

        const bookTitle = `${book.volumeInfo.title}`;
        const bookAuthor = `${book.volumeInfo.authors}`;
        const bookDescription = `${book.volumeInfo.description}`;
        // const bookImage = "book.volumeInfo.imageLinks";
        console.log(bookTitle);

        const textNodeTitle = textNode(bookTitle);
        const textNodeAuthor = textNode(bookAuthor);
        const textNodeDescription = textNode(bookDescription);

        element.appendChild(textNodeTitle);
        element.appendChild(textNodeAuthor);
        element.appendChild(textNodeDescription);
        // element.appendChild(bookImage);

        console.log(element);
        return element;
    });

    // appending the elements to grid

    const append = (parent) => (child) => parent.appendChild(child);
    bookItems.forEach(append(list));

    // allows us to reset the list when hitting the search button again instead of stacking on top of each other.

    if (list.innerHTML) {
        list.innerHTML = "";
        bookItems.forEach(append(list));
    } else {
        bookItems.forEach(append(list));
    }
    console.log(bookItems);
});

//array keys under volumeInfo{} = image, author, title, description
//books.volumeInfo.imageLinks
//books.volumeInfo.authors
//books.volumeInfo.title
//books.volumeInfo.description

//element.classList.add("addclassname");
// add classlist to element to style

// once we have populateed grid, use modal for pop ups when clicking on a book
