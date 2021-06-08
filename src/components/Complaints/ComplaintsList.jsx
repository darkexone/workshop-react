import PropTypes from "prop-types";

const ComplaintsList = ({ complaints }) => (
  <div>
    {complaints.map((c) => (
      <div key={c.id}>
        <h1>Reklamacja nr {c.id}</h1>

        <div>
          <p>Status: {c.status}</p>
          <p>Opis: {c.description}</p>
          {c.order !== null && <p>Dotyczy zamówienia nr: {c.order}</p>}
          {c.job !== null && <p>Dotyczy zlecenia nr: {c.job}</p>}
        </div>
      </div>
    ))}
  </div>
);

export default ComplaintsList;

ComplaintsList.propTypes = {
  complaints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      order: PropTypes.number,
      job: PropTypes.number,
    }),
  ).isRequired,
};
