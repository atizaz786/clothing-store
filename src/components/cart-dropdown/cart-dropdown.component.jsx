import { React } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'




import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles'


const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems)

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')

    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems?.length === 0 ? <EmptyMessage>Your cart is empty</EmptyMessage> :
                        cartItems?.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
            </CartItems>
            <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>

        </CartDropdownContainer>

    )
}

export default CartDropdown