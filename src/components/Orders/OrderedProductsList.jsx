import PropTypes from "prop-types";

const OrderedProductsList = ({ products }) => (
  <div>
    {products.map((p) => (
      <div key={p.id}>
        <h1>{p.name}</h1>
        <div>
          <p>Cena: {p.price}</p>
        </div>
      </div>
    ))}
  </div>
);

export default OrderedProductsList;

OrderedProductsList.propTypes = {
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
