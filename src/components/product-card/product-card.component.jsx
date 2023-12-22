import { React, useContext } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'


import Button, {BUTTON_TYPES} from '../button/button.component'

import { Name, Price, FooterContainer, ProductCardContainer } from './product-card.styles'


const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const cartItems  = useSelector(selectCartItems);

    const { name, price, imageUrl } = product;

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <FooterContainer>
                <Name>{name}</Name>
                <Price >{price}</Price>
            </FooterContainer>
            <Button buttonType={BUTTON_TYPES?.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard
