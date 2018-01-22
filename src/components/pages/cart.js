"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';
import Modal from 'react-modal';

// This is for Modal styling...
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      color                 : '#2F4F4F'
    }
  };
 
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
        let cartAfterDelete = [...currentCartItemToDelete.slice(0, indexToDelete),...currentCartItemToDelete.slice(indexToDelete+1)];

        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id)
    {
        this.props.updateCart(_id, 1);
    }

    onDecrement(_id, quantity)
    {
        if(quantity > 1)
        {
            this.props.updateCart(_id, -1);
        }
        
    }

    constructor()
    {
        //console.log("constructor");
        super();
        this.state = {
            modalIsOpen: false
        };
        // console.log("showModal", showModal);

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    

    openModal()
    {
        // console.log("open method");
        this.setState({ modalIsOpen: true });
        // console.log("open method after", showModal);
    }

    afterOpenModal()
    {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#696969';
        this.topcorner.style.position = "absolute";
        this.topcorner.style.right = "10px";
        this.topcorner.style.top = "10px";

    }

    closeModal()
    {
        this.setState({ modalIsOpen: false });
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
                            <h6>QTY <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small"> - </Button>
                                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small"> + </Button>
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
                    <Row>
                        <Col xs={12}>
                            <h6>Total amount: {this.props.totalAmount}</h6>
                            <Button onClick={this.openModal} bsStyle="success" bsSize="small">
                                PROCEED TO CHECKOUT
                            </Button>
                        </Col>
                    </Row>

                    {/**
                     * This is Modal code for messages
                     */}
                    <div>
                        {/* <button onClick={this.openModal}>Open Modal</button> */}
                        <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Minimal"

                        style={{
                                overlay: {
                                    backgroundColor: 'grey'
                                },
                                content: {
                                    color: '#2F4F4F'
                                }
                                }}
                        >
                
                        <h2 ref={subtitle => this.subtitle = subtitle}>Thank you !</h2>
                        <div>   
                            <h6>Your order has been saved.</h6>
                            <p> You will receive an email confirmation </p>

                        </div>
                        <form>
                            {/* <input /> */}
                            {/* <button>tab navigation</button>
                            <button>stays</button>
                            <button>inside</button>
                            <button>the modal</button> */}
                            <h6>total $: {this.props.totalAmount} </h6>
                            <button ref={topcorner => this.topcorner = topcorner} onClick={this.closeModal}>close</button>
                        </form>
                        </Modal>
                    </div>
                    {/**
                     * End of Modal code for messages
                     */}


                    
                    
                </Panel>
            )
        
    }
}

function mapStateToProps(state)
{
    return{
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart:updateCart
    },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);