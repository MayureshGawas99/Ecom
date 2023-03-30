import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "./feature/checkout-slice";
import cartReducer from "./feature/cart-slice";
import productsReducer from "./feature/products-slice";
import categoriesReducer from "./feature/categories-slice";

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        products: productsReducer,
        categories: categoriesReducer,
        checkout: checkoutReducer,
    }
});
