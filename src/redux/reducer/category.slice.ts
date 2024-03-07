import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../axios";

export const getCategories = createAsyncThunk("category/get", () => {
  return API.get("category/read.php")
    .then((response) => response.data)
    .catch((err) => err.message);
});

export interface CategoryInterface {
  category_id: string;
  categoryname: string;
  category_slug: string;
  createddate?: Date | null;
  modifieddate?: Date | null;
  createdby?: Date | null;
  modifiedby?: Date | null;
}

interface CategoryState {
  category: CategoryInterface[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  category: [],
  loading: "idle",
} as CategoryState;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCategories.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action.payload.category;
        if (data && data.length > 0) {
          state.category = data;
          state.loading = "succeeded";
        }
      }
    );

    builder.addCase(getCategories.rejected, (state) => {
      state.loading = "failed";
      console.log("Failed to fetch todos from backend!!!");
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
