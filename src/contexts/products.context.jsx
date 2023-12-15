import { createContext, useState, useEffect } from 'react';


import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null,
});  //null is the default value of the context

export const ProductsProvider = ({ children }) => {

    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    useEffect(() => {
        console.log(products)
    }, [products]);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )

}