import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";
import HomePage from ".";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;
export const retrievePausedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pausedOrders
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders
);


export const retrievefinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders
);