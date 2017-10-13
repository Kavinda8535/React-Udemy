"use strict"

//Books Reducers
export function booksReducers(state={
    books:[{
        _id: 1,
        title: 'this is the book title',
        description: 'this is the book description',
        price: 33.22
    },
    {
        _id: 2,
        title: 'this is the second book title',
        description: 'this is the second book description',
        price: 21.42
    },
    {
        _id: 3,
        title: 'this is the third book title',
        description: 'this is the third book description',
        price: 52.32
    }
]
}, action){ //state={} => this is representing an object, state=[] => array of obejcts
    
    switch(action.type){

        case "GET_BOOKS":
        return {...state, books:[...state.books]} // This is a spread operator [spread (...)] this will only work if you installed stage-1 pack in your app.
        break;

        case "POST_BOOK":
        // let books = state.books.concat(action.payload); //Concatinate two dispatch into one to maintian one state.(otherwise state will overwrite with the last dispatch data)
        //return state = action.payload;
        // return {books}; //{books} this is an array object, it should cover with curly brakets.
        console.log("...action.payload ", ...action.payload);
        return {books:[...state.books, ...action.payload]} // This is a spread operator [spread (...)] this will only work if you installed stage-1 pack in your app.
        break;
        // case "DECREMENT":
        // return state - action.payload;
        // break;
        case "DELETE_BOOK":
        //Create a copy of the current array books
        const currentBookToDelete = [...state.books]

        // Determind at which index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(
            function(book){
                // console.log("currentBookToDelete --", currentBookToDelete)
                // console.log("book --", book);
                // console.log("book.id --", book.id);
                // console.log("action.payload.id--", action.payload.id);
                return book._id == action.payload; //=== means exact match like eg: 2 === 2 correct. but 2 === "2" is wrong. get ride of his can use == . This will identify 2 == "2" correct.
            }
        )

        // console.log("indexToDelete --", indexToDelete);

        // use slice to remove the book at the specified index
        return {books: [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete+1)]}
        break;

        case "UPDATE_BOOK":
        //Create a copy of the current array books
        const currentBookToUpdate = [...state.books]

        // Determind at which index in books array is the book to be deleted
        const indexToUpdate = currentBookToUpdate.findIndex(
            function(book){
                return book._id === action.payload._id;
            }
        )

        // Create a new book object with the new values and with the same array index of the item we want to replace. To achive this we will use ...spread but we could use concat method too.
        const newBookToUpdate = {
            ...currentBookToUpdate[indexToUpdate],
            title: action.payload.title
        }

        // This Log has the purpose to show you how newBookToUpdate looks like
        console.log("What is  it newBookToUpdate", newBookToUpdate);

        // use slice to remove the book at the specified index, replace with the new object and concatenate with the rest of item in the array.
        return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
            ...currentBookToUpdate.slice(indexToUpdate + 1)]}
            break;

        
    }
    return state
}



