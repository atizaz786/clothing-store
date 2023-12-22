import {React} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

import { CheckoutItemContainer, ImageContainer, NameContainer, QuantityContainer, PriceContainer, ArrowContainer, ValueContainer,RemoveButtonContainer } from './checkout-item.styles';



const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const {imageUrl, name, price, quantity} = cartItem;


    const clearItemHandler = () => {
        dispatch(clearItemFromCart(cartItems, cartItem))

    }

    const addItemHandler = () => {
       dispatch(addItemToCart(cartItems, cartItem))
    }

    const removeItemHandler = () => {
        dispatch(removeItemFromCart(cartItems,cartItem))
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