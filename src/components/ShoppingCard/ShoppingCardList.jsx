import PropTypes from "prop-types";
import "../../style/components/ShoppingCardList.scss";

const ShoppingCardList = ({ products }) => {
  const deleteProduct = (productId) => {
    let shoppingList = [];
    const shoppingString = localStorage.getItem("shoppingCard");
    if (shoppingString !== null && shoppingString !== "") {
      shoppingList = JSON.parse(shoppingString);
    }
    const existingProductIndex = shoppingList.findIndex(
      (e) => e.id === productId,
    );
    if (existingProductIndex !== -1) {
      shoppingList.splice(existingProductIndex, 1);
    }
    localStorage.setItem("shoppingCard", JSON.stringify(shoppingList));
    window.location.reload(false);
  };

  return (
    <div className="shoppingCardList">
      {products.map((p) => (
        <div key={p.id} className="shoppingCardList-list">
          <h1>{p.name}</h1>
          <p>Cena: {p.price}</p>
          {p.stock > 0 && <p>Dostępnych: {p.stock}</p>}
          {p.stock === 0 && <p>Produkt niedostępny</p>}
          <button type="submit" onClick={() => deleteProduct(p.id)}>
            Usuń
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCardList;

ShoppingCardList.propTypes = {
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
