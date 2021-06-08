import PropTypes from "prop-types";
import { store } from "../../redux/createStore";
import "../../style/components/JobsList.scss";

const JobsList = ({ jobs }) => {
  const state = store.getState();

  return (
    <div className="jobsList">
      {jobs.map((p) => (
        <div key={p.id} className="jobsList-job">
          <h1>Zlecenie nr {p.id}</h1>

          <div className="jobsList-job-description">
            <p>Status: {p.status}</p>
            <p>Cena: {p.price}</p>
            <p>Opis: {p.description}</p>
            <p>Data rozpoczęcia: {p.start_date}</p>
            <p>Data zakończenia: {p.end_date}</p>
            {state.auth.type === 1 && (
              <a href={`/complaints/new/job/${p.id}`}>Złóż reklamację</a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsList;

JobsList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      client: PropTypes.number.isRequired,
      mechanic: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
