import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getAllOrders from "../api/orders/getAllOrders";
import OrdersList from "../components/Orders/OrdersList";
import Layout from "../components/Shared/Layout";
import "../style/containers/Orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { access } = useSelector((state) => state.auth);

  const fetchOrders = async () => {
    const newOrders = await getAllOrders();
    setOrders(newOrders);
  };

  useEffect(() => {
    if (access) {
      fetchOrders();
    }
  }, [access]);

  return (
    <Layout>
      <div className="orders">
        <header>
          <p className="orders-tittle">Masz {orders.length} zamówień.</p>
          {orders.length > 0 && <OrdersList orders={orders} />}
        </header>
      </div>
    </Layout>
  );
};

export default Orders;
