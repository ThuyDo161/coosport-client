import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../axios";

export const getSlides = createAsyncThunk("slide/get", () => {
  return API.get("slide/read.php")
    .then((response) => response.data)
    .catch((err) => err.message);
});

export interface slideInterface {
  slide_id: string;
  title: string;
  description: string;
  img: string;
  color: string;
  path: string;
}

interface slideState {
  slide: slideInterface[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  slide: [],
  loading: "idle",
} as slideState;

export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getSlides.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action.payload.slide;
        if (data && data.length > 0) {
          state.slide = data;
          state.loading = "succeeded";
        }
      }
    );

    builder.addCase(getSlides.rejected, (state) => {
      state.loading = "failed";
      console.log("Failed to fetch todos from backend!!!");
    });
  },
});

export const {} = slideSlice.actions;

export default slideSlice.reducer;
