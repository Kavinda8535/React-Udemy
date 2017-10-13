"use strict"

// CART REDUCERS
export function CR(state={cart:[]}, action){
    switch(action.type){
        
        case "ADD_TO_CART":
        return {...state,
            cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQty: totals(action.payload).qty
        }
        break;

        case "DELETE_CART_ITEM":
        return {...state, 
            cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQty: totals(action.payload).qty
        }
        break;

        case "UPDATE_CART":

        //Create a copy of the current array books
        const currentBookToUpdate = [...state.cart]
        
                // Determind at which index in books array is the book to be deleted
                const indexToUpdate = currentBookToUpdate.findIndex(
                    function(book){
                        return book._id === action._id;
                    }
                )
        
                // Create a new book object with the new values and with the same array index of the item we want to replace. To achive this we will use ...spread but we could use concat method too.
                const newBookToUpdate = {
                    ...currentBookToUpdate[indexToUpdate],
                    quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
                }
                
                // use slice to remove the book at the specified index, replace with the new object and concatenate with the rest of item in the array.
                let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
                    ...currentBookToUpdate.slice(indexToUpdate + 1)]

        return {...state, 
            cart:cartUpdate,
            totalAmount: totals(cartUpdate).amount,
            totalQty: totals(cartUpdate).qty
        }
        break;
    }
    return state;
    //console.log("CART Reducer");
}

export function totals(payloadArr)
{
    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price * cartArr.quantity;
    }).reduce(function(a, b){
        return a + b;
    }, 0); // START SUMMING FROM INDEX0

    const totalQty = payloadArr.map(function(qty){
        return qty.quantity;
    }).reduce(function(a, b){
        return a + b;
    }, 0);

    return {amount:totalAmount.toFixed(2), qty:totalQty}
    
}