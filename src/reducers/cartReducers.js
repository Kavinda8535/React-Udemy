"use strict"

// CART REDUCERS
export function CR(state={cart:[]}, action){
    switch(action.type){
        case "ADD_TO_CART":
        return {cart:[...state,...action.payload]}
        break;
        case "DELETE_CART_ITEM":
        return {...state, cart:action.payload}
        break;
    }
    return state;
    //console.log("CART Reducer");
}