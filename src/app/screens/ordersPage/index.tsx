
import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(dispatch);
  const {orderBuilder} = useGlobals();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS **/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img src={"/icons/default-user.svg"} className={"order-user-avatar"} alt="User" />
                <div>
                  <img src={"/icons/user-badge.svg"} className={"order-user-prof-img"} alt="Badge" />
                </div>
              </div>
              <span className={"order-user-name"}>Edward</span>
              <span className={"order-user-prof"}>User</span>
              <hr className="line" />
              <p>Busan, South Korea</p>
            </Box>
          </Box>
          <Box className="box">
            <input
              type="text"
              placeholder="       Card Number: 545 6456 754 6654"
              className="payment-input"
            />

            <Box className={"box-input"}>
              <input type="number" placeholder="  07/25" className="date-input" />
              <br />
              <input type="text" placeholder="  CVV: 010" className="cvv-input" />
            </Box>

            <input type="text" placeholder="  Justin Robertson" className="card-name" />

            <Box className={"card-img"}>
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.wstlybXjf3i1JeprVS6thQHaEy&pid=Api&P=0&h=220"
                alt="bu yerda rasm bor"
                width={"50px"}
                height={"40px"}
              />
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.wstlybXjf3i1JeprVS6thQHaEy&pid=Api&P=0&h=220"
                alt="bu yerda rasm bor"
                width={"50px"}
                height={"40px"}
              />
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.wstlybXjf3i1JeprVS6thQHaEy&pid=Api&P=0&h=220"
                alt="bu yerda rasm bor"
                width={"50px"}
                height={"40px"}
              />
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.wstlybXjf3i1JeprVS6thQHaEy&pid=Api&P=0&h=220"
                alt="bu yerda rasm bor"
                width={"50px"}
                height={"40px"}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
