"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Col, Row, Button} from 'react-bootstrap';

// Adding Components to BooksList Component
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component
{
    componentDidMount(){
        // DISPATCH an ACTION
        this.props.getBooks();
    }
    

    render(){
        // console.log('Ae we ACCESSING THE STATE ?? : ', this.props.books);
        const booksList = this.props.books.map(function(booksArr){
            return(
                // <div key={booksArr.id}>
                //     <h2> {booksArr.title} </h2>
                //     <h2> {booksArr.description} </h2>
                //     <h2> {booksArr.price} </h2>
                //     <Button bsStyle="primary">Buy now</Button>
                // </div>
                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                    <BookItem 
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        price={booksArr.price}
                        />
                </Col>
            )
        })
        return(
        <div>
            {/* <h1>Hello React</h1> */}
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <BooksForm/>
                    </Col>

                    {/* <Row style={{marginTop:'15px'}}> */}
                    {booksList}
                    {/* </Row> */}
                </Row>
            </Grid>

            
        </div>
        )
    }
}

function mapStateToProps(state)
{
    return{
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch){
    // return bindActionCreators({
    //     getBooks:getBooks,
    // otherActions: xxxx}, dispatch) //Multiple action dispatch like getBooks, otherActions
    
    return bindActionCreators({getBooks:getBooks}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);