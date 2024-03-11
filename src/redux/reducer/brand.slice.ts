import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../axios";

export const getBrands = createAsyncThunk("brand/get", () => {
  return API.get("brand/read.php")
    .then((response) => response.data)
    .catch((err) => err.message);
});

export interface BrandInterface {
  brand_id: string;
  brandname: string;
  brand_slug: string;
  createddate?: Date | null;
  modifieddate?: Date | null;
}

interface brandState {
  brand: BrandInterface[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  brand: [],
  loading: "idle",
} as brandState;

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getBrands.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action.payload.brand;
        if (data && data.length > 0) {
          state.brand = data;
        } else {
          state.brand = [];
        }
        state.loading = "succeeded";
      }
    );

    builder.addCase(getBrands.rejected, (state) => {
      state.loading = "failed";
      console.log("Failed to fetch todos from backend!!!");
    });
  },
});

export const {} = brandSlice.actions;

export default brandSlice.reducer;
