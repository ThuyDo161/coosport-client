import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../axios";

export const payBill = createAsyncThunk<any, any>("cart/payBill", (data) => {
  return API.post("bill/create.php", data)
    .then((response) => response.data)
    .catch((err) => err.message);
});

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [];

type initialStateTypes = {
  value: any;
};

const initialState: initialStateTypes = {
  value: items,
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state: initialStateTypes, action: PayloadAction<any>) => {
      const newItem = action.payload;
      const duplicate = state.value.filter(
        (e: any) =>
          e.parentId === newItem.parentId && e.id_product === newItem.id_product
      );
      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e: any) =>
            e.parentId !== newItem.parentId ||
            e.id_product !== newItem.id_product
        );
        state.value = [
          ...state.value,
          {
            ...duplicate[0],
            id: duplicate[0].id,
            quantity: parseInt(newItem.quantity) + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...newItem,
            price: parseInt(newItem.price),
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0
          )
        )
      );
    },
    updateItem: (state: initialStateTypes, action: PayloadAction<any>) => {
      const newItem = action.payload;
      const item = state.value.filter(
        (e: any) =>
          e.parentId === newItem.parentId && e.id_product === newItem.id_product
      );
      if (item.length > 0) {
        state.value = state.value.filter(
          (e: any) =>
            e.parentId !== newItem.parentId ||
            e.id_product !== newItem.id_product
        );
        state.value = [
          ...state.value,
          {
            ...item[0],
            id: item[0].id,
            quantity: newItem.quantity,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0
          )
        )
      );
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.value = state.value.filter(
        (e: any) =>
          e.slug !== item.slug || e.color !== item.color || e.size !== item.size
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0
          )
        )
      );
    },
    clearCart: (state) => {
      state.value = [];
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value
        )
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, clearCart } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
