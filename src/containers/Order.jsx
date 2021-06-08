import { useState, useEffect } from "react";
import getAllProducts from "../api/products/getAllProducts";
import Layout from "../components/Shared/Layout";
import ShoppingCardList from "../components/ShoppingCard/ShoppingCardList";
import createOrder from "../api/orders/createOrder";
import "../style/containers/Order.scss";

const Order = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [deliveryType, setDeliveryType] = useState("CO");
  let storedProducts = JSON.parse(localStorage.getItem("shoppingCard"));
  if (!storedProducts) {
    storedProducts = [];
  }
  const [shoppingProducts, setShoppingProducts] = useState([]);

  const fetchProducts = async () => {
    const newProducts = await getAllProducts();
    setAllProducts(newProducts);
  };

  const setShoppingCardProducts = () => {
    const newShoppingCardProducts = allProducts.filter((all) =>
      storedProducts.some((filter) => filter.id === all.id),
    );
    setShoppingProducts(newShoppingCardProducts);
  };

  useEffect(() => {
    fetchProducts();
    setShoppingCardProducts();
  }, []);

  useEffect(() => {
    setShoppingCardProducts();
  }, [allProducts]);

  const order = async () => {
    await createOrder(deliveryType, storedProducts);
  };

  return (
    <Layout>
      <header className="order">
        <p className="order-header">
          Masz {shoppingProducts.length} produktów w koszyku.
        </p>
        {shoppingProducts.length > 0 && (
          <>
            <ShoppingCardList
              products={shoppingProducts}
              shoppingCard={storedProducts}
            />
            <label htmlFor="type">
              Wybierz formę dostawy:
              <select
                defaultValue={deliveryType}
                onClick={(e) => setDeliveryType(e.target.value)}
              >
                <option value="CO">Kurier</option>
                <option value="PP">Odbiór osobisty</option>
                <option value="IP">Paczkomat</option>
              </select>
            </label>
            <button type="button" onClick={() => order()}>
              ZAMÓW
            </button>
          </>
        )}
      </header>
    </Layout>
  );
};

export default Order;
