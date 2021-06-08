import { useState } from "react";
import { useHistory } from "react-router";
import addNewJob from "../api/jobs/addNewJob";
import Layout from "../components/Shared/Layout";
import "../style/containers/NewJob.scss";

const NewJob = () => {
  const [type, setType] = useState("MEC");
  const [description, setDescription] = useState();
  const [startDate, setStartDate] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addNewJob(type, description, startDate);
    if (response !== undefined) {
      history.push("/jobs");
    } else {
      // eslint-disable-next-line no-alert
      alert("Wystąpił błąd, sprawdź wprowadzone dane");
    }
  };

  return (
    <Layout>
      <header className="newJob">
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="type">
              Typ:
              <select
                defaultValue={type}
                onClick={(e) => setType(e.target.value)}
              >
                <option value="MEC">Mechanika</option>
                <option value="ELE">Elektryka</option>
                <option value="VAR">Lakiernictwo</option>
              </select>
            </label>
            <label htmlFor="description">
              Opis:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label htmlFor="start_date">
              Data:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <button type="submit">Dodaj</button>
          </form>
        </div>
      </header>
    </Layout>
  );
};

export default NewJob;
