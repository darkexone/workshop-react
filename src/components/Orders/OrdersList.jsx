import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import getAllProducts from "../../api/products/getAllProducts";
import OrderedProductsList from "./OrderedProductsList";
import "../../style/components/OrdersList.scss";

const OrdersList = ({ orders }) => {
  const [allProducts, setProducts] = useState([]);

  const fetchProducts = async () => {
    const newProducts = await getAllProducts();
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="ordersList">
      {orders.map((o) => (
        <div key={o.id}>
          <h1>Zamówienie nr {o.id}</h1>

          <div>
            {o.status === "WT" && <p>Status: Oczekuje</p>}
            {o.status === "IR" && <p>Status: W realizacji</p>}
            {o.status === "DN" && <p>Status: Zrealizowano</p>}
            {o.delivery === "CO" && <p>Sposób dostawy: Kurier</p>}
            {o.delivery === "PP" && <p>Sposób dostawy: Odbiór osobisty</p>}
            {o.delivery === "IP" && <p>Sposób dostawy: Paczkomat</p>}
            <p>Data zamówienia: {o.order_date}</p>
            <OrderedProductsList
              products={allProducts.filter((all) =>
                o.products.some((filter) => filter === all.id),
              )}
            />
            <a href={`/complaints/new/order/${o.id}`}>Złóż reklamację</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      delivery: PropTypes.string.isRequired,
      order_date: PropTypes.string.isRequired,
      client: PropTypes.number,
      products: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
