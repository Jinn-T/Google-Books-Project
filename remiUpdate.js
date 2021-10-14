// Creating variable for Google Books API URL
const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";

//Dom select
const grid = document.querySelector(".book-grid");
const button = document.querySelector(".search-button");

const list = document.querySelector(".books-grid-list");

// Function to fetch API data
const getBooks = async (title) => {
    const response = await fetch(`${BOOKS_URL}${title}&maxResults=5`);
    const data = await response.json();
    return data.items;
};

const createElementWithText = (element, text) => {
    const newElem = document.createElement(element); //creating a HTML element
    const newText = document.createTextNode(text);
    newElem.appendChild(newText);
    return newElem;
};

const createBookCard = (bookTitle, bookAuthors, bookDesc, bookImgUrl) => {
    const listItem = document.createElement("li"); // creating the main list where we will append other items
    const bookImg = document.createElement("img");
    bookImg.src = bookImgUrl; // attaching the url src to bookImg variable

    listItem.appendChild(createElementWithText("h3", bookTitle)); // appending our text function to our li
    listItem.appendChild(createElementWithText("h4", bookAuthors));
    listItem.appendChild(createElementWithText("p", bookDesc));
    listItem.appendChild(bookImg);

    // adding a class name to our elements
    listItem.classList.add("list-item");
    bookImg.classList.add("book-img");

    return listItem;
};

//create an on click event that will grab our input and create new elements
button.addEventListener("click", async (event) => {
    const input = document.querySelector("#form-input");
    const userInput = input.value; // .value grabs the text from input
    console.log(userInput);
    if (!userInput) {
        alert("please insert valid book");
        return;
    }

    const books = await getBooks(userInput); // grabbing the data from api
    console.log(books);

    const bookItems = books.map((book) => {
        // now map the items to a card

        const bookUrl = book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.smallThumbnail
            : "https://fakeimg.pl/400x500";

        console.log(bookUrl);

        //(ternary) a condition followed by the ?, we then execute the next expression if the condition is truthy followed by :, if the condition is falsy

        const bookTitl = book.volumeInfo.title
            ? book.volumeInfo.title
            : "Title not found";

        const bookAuth = book.volumeInfo.authors
            ? book.volumeInfo.authors
            : "Author not found";

        const bookDesc = book.volumeInfo.description
            ? book.volumeInfo.description
            : "No description";

        return createBookCard(
            //when calling the function you must pass the arguments in the same order
            bookTitl,
            bookAuth,
            bookDesc,
            bookUrl
            // book.volumeInfo.title,
            // book.volumeInfo.authors,
            // book.volumeInfo.description,
        );
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
