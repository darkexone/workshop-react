import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import getAllJobs from "../api/jobs/getAllJobs";
import JobsList from "../components/Jobs/JobsList";
import Layout from "../components/Shared/Layout";
import "../style/containers/Jobs.scss";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { access, type } = useSelector((state) => state.auth);
  const history = useHistory();

  const fetchJobs = async () => {
    const newJobs = await getAllJobs();
    setJobs(newJobs);
  };

  useEffect(() => {
    if (access) {
      fetchJobs();
    }
  }, [access]);

  const moveToNewJobForm = () => {
    history.push("/jobs/add");
  };

  return (
    <Layout>
      <div className="jobs">
        <header>
          <p className="jobs-tittle">Masz {jobs.length} zleceń.</p>
          {type === 1 && (
            <button type="button" onClick={() => moveToNewJobForm()}>
              Nowe zlecenie
            </button>
          )}
          {jobs.length > 0 && <JobsList jobs={jobs} />}
        </header>
      </div>
    </Layout>
  );
};

export default Jobs;
