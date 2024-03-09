import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../axios";

export const getBanners = createAsyncThunk("Banner/get", () => {
  return API.get("banner/read.php")
    .then((response) => response.data)
    .catch((err) => err.message);
});

export interface BannerInterface {
  id: string;
  title: string;
  img: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface BannerState {
  banner: BannerInterface[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  banner: [],
  loading: "idle",
} as BannerState;

export const BannerSlice = createSlice({
  name: "Banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getBanners.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data: BannerInterface[] = action.payload.banners;
        if (data && data.length > 0) {
          state.banner = data.filter((banner) => banner.is_active);
        } else {
          state.banner = [];
        }
        state.loading = "succeeded";
      }
    );

    builder.addCase(getBanners.rejected, (state) => {
      state.loading = "failed";
      console.log("Failed to fetch todos from backend!!!");
    });
  },
});

export const {} = BannerSlice.actions;

export default BannerSlice.reducer;
