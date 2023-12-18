import React from 'react';

import { CartItemContainer, ItemDetailsContainer, NameContainer, PriceContainer } from './cart-item.styles';

const CartItem = ({cartItem}) => {
    const {imageUrl, name, price, quantity} = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetailsContainer>
                <NameContainer className='name'>{name}</NameContainer>
                <PriceContainer className='price'>{quantity} x ${price}</PriceContainer>

            </ItemDetailsContainer>
        </CartItemContainer>
    )

}

export default CartItem;