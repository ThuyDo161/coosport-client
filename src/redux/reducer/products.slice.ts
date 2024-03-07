import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../axios";

export const getProducts = createAsyncThunk("products/get", () => {
  return API.get("product/read.php")
    .then((response) => response.data)
    .catch((err) => err.message);
});
export const getProductDetail = createAsyncThunk<any, string | undefined>(
  "products/getDetail",
  (id) => {
    return API.get("product/detail.php?id=" + id)
      .then((response) => response.data)
      .catch((err) => err.message);
  }
);

export const productSearch = createAsyncThunk<any, any>(
  "products/search",
  (data) => {
    if (data.from) {
      return API.get(
        `product/readbyslug.php?slug=${data.slug}&_from=${data.from}&_to=${data.to}`
      )
        .then((response) => response.data)
        .catch((err) => err.message);
    }
    return API.get(`product/search.php?key=${data}`)
      .then((response) => response.data)
      .catch((err) => err.message);
  }
);

export const productsBySlug = createAsyncThunk<any, any>(
  "products/getBySlug",
  (data) => {
    if (data.from) {
      return API.get(
        `product/readbyslug.php?slug=${data.slug}&_from=${data.from}&_to=${data.to}`
      )
        .then((response) => response.data)
        .catch((err) => err.message);
    }
    return API.get(`product/readbyslug.php?slug=${data}`)
      .then((response) => response.data)
      .catch((err) => err.message);
  }
);

export interface productInterface {
  product_id: string;
  productname: string;
  pricesell: number;
  priceentry: number;
  count: string;
  description: string;
  categoryname: string;
  brandname: string;
  colorname: string[] | string;
  color_code: string;
  sizename: string[] | string;
  size: string;
  img: string[];
  product_slug: string;
}

interface productState {
  allProduct: productInterface[];
  searchProduct: productInterface[];
  productDetail: productInterface[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  valueModal: any;
}

const initialState = {
  allProduct: [],
  searchProduct: [],
  productDetail: [],
  loading: "idle",
  valueModal: "",
} as productState;

export const productsSlice = createSlice({
  name: "productModal",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<any>) => {
      state.valueModal = action.payload;
    },
    remove: (state) => {
      state.valueModal = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action.payload.product;
        if (data && data.length > 0) {
          state.allProduct = data;
          state.loading = "succeeded";
        }
      }
    );

    builder.addCase(productSearch.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      productSearch.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action.payload.product;
        if (data && data.length > 0) {
          state.searchProduct = data;
          state.loading = "succeeded";
        } else state.allProduct = [];
      }
    );

    builder.addCase(productsBySlug.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      productsBySlug.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action.payload.product;
        if (data && data.length > 0) {
          state.allProduct = data;
          state.loading = "succeeded";
        } else state.allProduct = [];
      }
    );

    builder.addCase(getProductDetail.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      getProductDetail.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action.payload.product;
        if (data && data.length > 0) {
          state.productDetail = data;
          state.loading = "succeeded";
        } else state.allProduct = [];
      }
    );

    builder.addCase(getProducts.rejected, (state) => {
      state.loading = "failed";
      console.log("Failed to fetch todos from backend!!!");
    });
  },
});

// Action creators are generated for each case reducer function
export const { set, remove } = productsSlice.actions;

export default productsSlice.reducer;
