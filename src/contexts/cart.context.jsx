import { createContext, React, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";



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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled action type: ${type} in cartReducer`)
    }


}


export const CartProvider = ({ children }) => {

    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal }))
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);

    }

    const clearCartItem = (productToClear) => {
        const newCartItems = clearItemFromCart(cartItems, productToClear);
        updateCartItemsReducer(newCartItems);

    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearCartItem, cartTotal }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}