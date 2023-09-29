
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
function createAdmin(books) {

    // Create an empty list element.
    const listElement = document.createElement("ul");
    const testElement = document.createElement("h1")
    listElement.appendChild(testElement)

    // Create buttons with text inputs for each book.
    books.forEach(book => {
        console.log(book.title)

        // Create a label element.
        const labelElement = document.createElement("label");
        // Create a button element for "submit"
        const buttonElement = document.createElement("button");
        //add event listeners to that buttonto update the inventory
        buttonElement.addEventListener('click', updateInventory);

        // Set the id attribute of the HTML element to the book id.
        const bookId = book.id;
        // Use the setAttribute() method to set the id attribute.
        buttonElement.setAttribute('id', bookId);

        // Create a text input element.
        const inputElement = document.createElement("input");

        // Set the text of the label element.
        labelElement.textContent = `${book.title}`
        // Set the type of the text input element to "number".
        inputElement.type = "number";
        inputElement.value = `${book.quantity}`
        // Use the setAttribute() method to set the id attribute.
        inputElement.setAttribute('id', 'input-' + bookId);
        // Set the text of the button element.
        buttonElement.textContent = 'Save'

        // Add the input element to the label element.
        labelElement.appendChild(inputElement);
        // Add the button input element to the label element.
        labelElement.appendChild(buttonElement);
        // Add the label element to the list element.
        listElement.appendChild(labelElement);
    });
    //append the whole list of elements in HTML form to the body of the document
    document.body.appendChild(listElement);
}


async function updateInventory() {
    //grab the id of the input based off the matched ID of the submit button
    targetButtonID = 'input-' + this.id
    //grab the integer input from the associated input button
    updatedQuantity = document.getElementById(targetButtonID).value
    //if the value is undefined, update inventory to that value
    if (!updatedQuantity) {
        console.log("no data")
    }
    else {
        //create our payload for the body of the API request
        console.log(this.id)
        const updatedInventory = {
            //since we matched the buttons and inputs to the book ID's using "this" works
            id: this.id,
            quantity: updatedQuantity,
        }
        //run our update post method
        await fetch('http://localhost:3001/updateBook', {
            //method is patch because we are just updating inventory
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            //stringifys the body we made
            body: JSON.stringify(updatedInventory)
        })
            .then(response => response.json())
            .then(json => {
                // Do something with the JSON data
                console.log(json);
            })
            .catch(error => {
                // Handle the error
                console.log(error);
            });
    }

}
/*
Left off:
Able to pass data through from matched input and submit buttons, but getting an eror
'no book with id of ___' even though I KNOW there is a book with that Id. weird.
*/


/*
REQUIREMENTS 
X Retrieve a list of books from the server. -- DONE
X Display a list of book titles to the admin. --- DONE
X Place a text input next to each book title. -- DONE
X Give each text input a value: the quantity of the associated book. --- DONE (also added title)
X Place a submit button next to each text input. -- DONE
- When the submit button is clicked, retrieve the quantity 
    from the associated text input and save the updated quantity to the server.

    ---> challenge on last step: keep getting invalid book ID error even for known ID values
*/