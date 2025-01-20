import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import { Container } from "@mui/material";
import ChosenProduct from "./ChosenProduct";

export default function ProductsPage() {
  const products = useRouteMatch();
  return <div className={"products-page"}>
    <Switch>
      <Route path={`${products.path}/:productId`}>
        <ChosenProduct/>
      </Route>
      <Route path={`${products.path}`}>

      </Route>
    </Switch>
  </div>;
}