import PropTypes from "prop-types";
import "../../style/components/ProductsList.scss";

const ProductsList = ({ products }) => {
  const addProduct = (productId) => {
    let shoppingList = [];
    const shoppingString = localStorage.getItem("shoppingCard");
    if (shoppingString !== null && shoppingString !== "") {
      shoppingList = JSON.parse(shoppingString);
    }
    const existingProductIndex = shoppingList.findIndex(
      (e) => e.id === productId,
    );
    if (existingProductIndex === -1) {
      shoppingList.push({ id: productId });
    }
    localStorage.setItem("shoppingCard", JSON.stringify(shoppingList));
  };

  return (
    <div className="products">
      {products.map((p) => (
        <div key={p.id} className="products-description">
          <h1>{p.name}</h1>
          <p>{p.description}</p>

          <div className="products-price">
            <p>Cena: {p.price}</p>
            {p.stock > 0 && (
              <>
                <p>Sztuk: {p.stock}</p>
                <button type="submit" onClick={() => addProduct(p.id)}>
                  Dodaj
                </button>
              </>
            )}
            {p.stock === 0 && <p>Produkt niedostępny</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
