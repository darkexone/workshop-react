import { useState } from "react";
import { useHistory, useParams } from "react-router";
import addNewComplaint from "../api/complaints/addNewComplaint";
import Layout from "../components/Shared/Layout";
import "../style/containers/NewComplaint.scss";

const NewComplaint = () => {
  const [description, setDescription] = useState();
  const history = useHistory();
  const params = useParams();
  const { type, id } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addNewComplaint(type, description, id);
    if (response !== undefined) {
      history.push("/complaints");
    } else {
      // eslint-disable-next-line no-alert
      alert("Wystąpił błąd, sprawdź wprowadzone dane");
    }
  };

  return (
    <Layout>
      <header>
        <div className="newComplaint">
          {type === "order" && <p>Dotyczy zamówienia nr: {id}</p>}
          {type === "job" && <p>Dotyczy zlecenia nr: {id}</p>}
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="description">
              Opis:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <button type="submit">Złóż reklamację</button>
          </form>
        </div>
      </header>
    </Layout>
  );
};

export default NewComplaint;
