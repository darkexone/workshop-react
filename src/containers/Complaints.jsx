import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getAllComplaints from "../api/complaints/getAllComplaints";
import ComplaintsList from "../components/Complaints/ComplaintsList";
import Layout from "../components/Shared/Layout";
import "../style/containers/Complaints.scss";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const { access } = useSelector((state) => state.auth);

  const fetchComplaints = async () => {
    const newComplaints = await getAllComplaints();
    setComplaints(newComplaints);
  };

  useEffect(() => {
    if (access) {
      fetchComplaints();
    }
  }, [access]);

  return (
    <Layout>
      <div className="complaints">
        <header>
          <p className="complaints-tittle">
            Masz {complaints.length} reklamacji.
          </p>
          {complaints.length > 0 && <ComplaintsList complaints={complaints} />}
        </header>
      </div>
    </Layout>
  );
};

export default Complaints;
