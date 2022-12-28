import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User/UserSlice";
import FaqReducer from "./Faq/FaqSlice";
import CartReducer from "./Cart/CartSlice";
import ProductReducer from "./Products/ProductSlice";
import { getUserByToken } from "./User/action-creators";
import { fetchCartProducts } from "./Cart/action-creators";
import orderSlice from "./Order/OrderSlice";
import { fetchUserOrders } from "./Order/action-creator";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Faq: FaqReducer,
    Cart: CartReducer,
    Product: ProductReducer,
    Order: orderSlice,
  },
});

const token = localStorage.getItem("token");
if (token) {
  store.dispatch(getUserByToken(token));
  store.dispatch(fetchCartProducts(token));
  store.dispatch(fetchUserOrders(token));
}
export default store;
