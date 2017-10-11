"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem} from '../../actions/cartActions';
 
class Cart extends React.Component
{
    onDelete(_id)
    {
        //Create a copy of the current array books
        const currentCartItemToDelete = this.props.cart;
        
                // Determind at which index in books array is the book to be deleted
                const indexToDelete = currentCartItemToDelete.findIndex(
                    function(cart){
                        return cart._id === _id;
                    }
                )

        // use slice to remove the book at the specified index
        let cartAfterDelete = [...currentCartItemToDelete.slice(0, indexToDelete),
            ...currentCartItemToDelete.slice(indexToDelete+1)]

        this.props.deleteCartItem(cartAfterDelete);
    }

    render()
    {
        if(this.props.cart[0])
        {
            return this.renderCart();
        }
        else
        {
            return this.renderEmpty();
        }
    }
    renderEmpty()
    {
        return(<div></div>)
    }
    renderCart()
    {
        const cartItemList = this.props.cart.map(function(cartArr){
            return(
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>USD {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>QTY <Label bsStyle="success"></Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button bsStyle="default" bsSize="small"> - </Button>
                                <Button bsStyle="default" bsSize="small"> + </Button>
                                {/* this is how we make spaces below span*/}
                                <span>     </span> 
                                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small"> DELETE </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
        }, this) //This "this" is added to make sure to onClick event is in right context.
            return(
                <Panel header="Cart" bsStyle="primary">
                    {cartItemList}
                </Panel>
            )
        
    }
}

function mapStateToProps(state)
{
    return{
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        deleteCartItem: deleteCartItem},dispatch
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);