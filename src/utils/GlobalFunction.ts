import swal from "sweetalert2";
import { productInterface } from "../redux/reducer/products.slice";

const numberWithCommas = (num: number | string) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const getRandomProducts = (array: productInterface[], count: number) => {
  const newArr = [...array];
  const max = array.length - count;
  if (max < 0) {
    return newArr;
  }
  const min = 0;
  const start = Math.floor(Math.random() * (max - min) + min);
  return newArr.slice(start, start + count);
};

const getCartItemsInfo = (allItem: any[], cartItems: any[]) => {
  const res: any[] = [];
  if (cartItems.length > 0 && allItem) {
    cartItems.forEach((e) => {
      const product = allItem.find(
        (prd) => prd.product_id.toString() == e.parentId.toString()
      );
      res.push({
        ...e,
        img: product?.img,
        title: product?.productname,
      });
    });
  }
  return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
};

const getProductBySlug = (array: productInterface[], slug: string) => {
  return array.find(
    (product) => slug === product.product_slug || product.product_id === slug
  );
};

const Toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", swal.stopTimer);
    toast.addEventListener("mouseleave", swal.resumeTimer);
  },
});

const messageSuccess = (message: string) =>
  Toast.fire({
    icon: "success",
    title: "<h3>" + message + "</h3>",
  });

const messageError = (message: string) =>
  swal.fire("<h2>Lỗi</h2>", "<h3>" + message + "</h3>", "error");

const messageConfirm = (message: string) =>
  swal.fire({
    title: `<h3>Bạn có thật sự muốn thực hiện ${message}?</h3>`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    customClass: {
      cancelButton: "size-1",
      confirmButton: "size-1",
    },
  });

const messageSave = (message: string) =>
  swal.fire("<h2>Đã lưu</h2>", "<h3>" + message + "</h3>", "success");

export {
  getRandomProducts,
  getProductBySlug,
  messageSuccess,
  messageError,
  getCartItemsInfo,
  messageConfirm,
  messageSave,
};
export default numberWithCommas;
