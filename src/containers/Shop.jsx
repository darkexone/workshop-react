import { useState, useEffect } from "react";
import getAllProducts from "../api/products/getAllProducts";
import Layout from "../components/Shared/Layout";
import ProductsList from "../components/Shop/ProductsList";
import "../style/containers/Shop.scss";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const newProducts = await getAllProducts();
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="shop">
        <header>
          <p className="shop-tittle">Sklep ma {products.length} produkty.</p>
          {products.length > 0 && <ProductsList products={products} />}
        </header>
      </div>
    </Layout>
  );
};

export default Shop;
