import { configureStore, ThunkAction, Action, } from "@reduxjs/toolkit";
import homePageReducer from "./screens/homePage/slice";
import reduxLogger from "redux-logger";
import ProductsPageReducer from "./screens/productsPage/slice";
import OrdersPageReducer from "./screens/productsPage/slice";

export const store = configureStore({
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
  reducer: {
  homePage: homePageReducer,
  productsPage: ProductsPageReducer,
  ordersPage: OrdersPageReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
