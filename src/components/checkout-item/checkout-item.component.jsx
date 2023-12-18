import {React, useContext} from 'react'

import { CheckoutItemContainer, ImageContainer, NameContainer, QuantityContainer, PriceContainer, ArrowContainer, ValueContainer,RemoveButtonContainer } from './checkout-item.styles';

import {CartContext} from '../../contexts/cart.context'


const CheckoutItem = ({cartItem}) => {

    const {imageUrl, name, price, quantity} = cartItem;

    const {removeItemFromCart, addItemToCart, clearCartItem} = useContext(CartContext)

    const clearItemHandler = () => {
        clearCartItem(cartItem)

    }

    const addItemHandler = () => {
        addItemToCart(cartItem)
    }

    const removeItemHandler = () => {
        removeItemFromCart(cartItem)
    }

    
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <NameContainer>{name}</NameContainer>
            <QuantityContainer>
            <ArrowContainer onClick={removeItemHandler}>&#10094;</ArrowContainer>
            <ValueContainer>{quantity}</ValueContainer>
            <ArrowContainer onClick={addItemHandler}>&#10095;</ArrowContainer>
            </QuantityContainer>
            <PriceContainer>{price}</PriceContainer>
            <RemoveButtonContainer onClick={clearItemHandler}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    )





}

export default CheckoutItem;