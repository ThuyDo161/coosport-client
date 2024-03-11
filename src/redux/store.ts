import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./reducer/brand.slice";
import cartItemsReducer from "./reducer/cartItems.slide";
import categoryReducer from "./reducer/category.slice";
import heroSliderReducer from "./reducer/hero-slide.slice";
import policyReducer from "./reducer/policy.slice";
import productModalReducer from "./reducer/products.slice";
import userReducer from "./reducer/user.slice";
import bannersReducer from "./reducer/banners.slice";

export const store = configureStore({
  reducer: {
    productModal: productModalReducer,
    cartItems: cartItemsReducer,
    category: categoryReducer,
    brands: brandReducer,
    heroSlideData: heroSliderReducer,
    policy: policyReducer,
    user: userReducer,
    banners: bannersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
