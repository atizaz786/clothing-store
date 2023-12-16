import { createContext, useState, React, useEffect } from "react";



const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem => {
            if (cartItem.id === productToAdd.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            }
            return cartItem;
        })
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    // find the item in the cart
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    // if the quantity is 1, remove the item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }
    // if the quantity is more than 1, decrement the quantity
    return cartItems.map(cartItem => {
        if (cartItem.id === productToRemove.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
        }
        return cartItem;
    })
}

const clearItemFromCart = (cartItems, productToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearCartItem: () => { },
    cartCount: 0,
    cartTotal: 0

})

/*

*/


export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false)

    const [cartItems, setCartItems] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])


    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])
   

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearCartItem = (productToClear) => {
        setCartItems(clearItemFromCart(cartItems, productToClear))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearCartItem, cartTotal }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}