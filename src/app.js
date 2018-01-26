"use strict"

// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

//React-Router
import {Route, Router, IndexRoute, browserHistory, hashHistory } from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'; //Logger must be last middleware in chain, otherwise it will log thunk and promise, not actual actions 

// IMPORT COMBINE REDUCERS
import reducers from './reducers/index';

// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBooks,deleteBooks,updateeBooks} from './actions/booksActions'

import BooksList from './components/pages/booksList';
// import Menu from './components/menu';
// import Footer from './components/footer';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

//Step 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// store.subscribe(function(){
//     console.log('current state is: ' , store.getState());
//     //console.log('current state is: ' , store.getState()[1].price);
// })

//Step 2 create and dispatch actions
// store.dispatch({type:"INCREMENT", payload: 1})
// store.dispatch({type:"INCREMENT", payload: 1})
// store.dispatch({type:"DECREMENT", payload: 1})

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>
);

render(
    /*<Provider store={store}>*/
        /*<div>*/
            /*/!*<Menu/>*!/*/
            /*<BooksList />*/
            /*/!*<Footer />*!/*/
        /*</div>*/
    /*</Provider> , document.getElementById('app')*/

    Routes, document.getElementById('app')
);

// store.dispatch(postBooks(
    
// ))

// DISPATCH a second action
// store.dispatch({
//     type:"POST_BOOK",
//     payload: [{
//         id: 3,
//         title: 'this is the third book title ',
//         description: 'this is the third book description',
//         price: 87.23
//     }]
// })

// DELETE a book
// store.dispatch(deleteBooks(
//      {id:1}
// ))


// UPDATE a book
// store.dispatch(updateeBooks(
//     {
//         id:2,
//         title: 'Learn by heart in React'
//     }
// ))


// -->> CART ACTIONS <<--
// store.dispatch({
//     type: "ADD_TO_CART",
//     payload: [{id: 1}]
// })

// store.dispatch(addToCart([{id: 1}]))