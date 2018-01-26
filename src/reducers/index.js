"use strict"

import {combineReducers} from 'redux';

// HERE Import REDUDERS TO BE COMBINE
import {booksReducers} from './booksReducers';
import {CR} from './cartReducers';

// HERE COMBINE THE REDUCERS
export default combineReducers({
    books: booksReducers,
    cart: CR
})
