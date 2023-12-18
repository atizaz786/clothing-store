import { React, useContext } from 'react'

import Button, {BUTTON_TYPES} from '../button/button.component'

import { Name, Price, FooterContainer, ProductCardContainer } from './product-card.styles'

import { CartContext } from '../../contexts/cart.context'

const ProductCard = ({ product }) => {

    const { name, price, imageUrl } = product;

    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product)
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
