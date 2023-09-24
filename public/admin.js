
// Your Code Here

async function main() {
//do the basics to fetch and local-ify the data from the api call
let response = await fetch('http://localhost:3001/listBooks')
let listofBooks = await response.json()
//run the non-async function we built to dislay the right info
createAdmin(listofBooks)

}
//fetch the stuff
main()
//define the non-async function to parse the book data
function createAdmin(books){

// Create an empty list element.
const listElement = document.createElement("ul");
const testElement = document.createElement("h1")
listElement.appendChild(testElement)

// Create 5 buttons with text inputs.
books.forEach(book => {
    console.log(book.title)

    // Create a label element.
    const labelElement = document.createElement("label");
    // Create a button element.
    const buttonElement = document.createElement("button");
    // Create a text input element.
    const inputElement = document.createElement("input");

    // Set the text of the label element.
    labelElement.textContent = `${book.title}`
    // Set the type of the text input element to "number".
    inputElement.type = "number";
      // Set the text of the button element.
    buttonElement.textContent = 'update inventory'

    // Add the text input element to the button element.
    labelElement.appendChild(inputElement);
    // Add the button input element to the label element.
    labelElement.appendChild(buttonElement);
    // Add the label element to the list element.
    listElement.appendChild(labelElement);
  });
  document.body.appendChild(listElement);
}


/*
REQUIREMENTS 
- Retrieve a list of books from the server.
- Display a list of book titles to the admin.
- Place a text input next to each book title.
- Give each text input a value: the quantity of the associated book.
- Place a submit button next to each text input.
- When the submit button is clicked, retrieve the quantity 
    from the associated text input and save the updated quantity to the server.

*/