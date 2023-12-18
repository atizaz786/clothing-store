import { React, useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import { CheckoutPageContainer, CheckoutHeaderContainer, HeaderBlockContainer, TotalContainer } from './checkout.styles'

const Checkout = () => {

    const { cartItems, cartTotal } = useContext(CartContext)

    return (
        <CheckoutPageContainer>
            <CheckoutHeaderContainer>
                <HeaderBlockContainer>
                    <span>Product</span>
                </HeaderBlockContainer>
                <HeaderBlockContainer>
                    <span>Description</span>
                </HeaderBlockContainer>
                <HeaderBlockContainer>
                    <span>Quantity</span>
                </HeaderBlockContainer>
                <HeaderBlockContainer>
                    <span>Price</span>
                </HeaderBlockContainer>
                <HeaderBlockContainer>
                    <span>Remove</span>
                </HeaderBlockContainer>
            </CheckoutHeaderContainer>
            {
                cartItems?.map((cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />

                    )
                }


                )
            }
            <TotalContainer>Total: ${cartTotal}</TotalContainer>
        </CheckoutPageContainer>
    )
}

export default Checkout