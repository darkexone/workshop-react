import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getUserProfile from "../api/accounts/getUserProfile";
import Layout from "../components/Shared/Layout";
import "../style/containers/Landing.scss";

const Landing = () => {
  const [profile, setProfile] = useState([]);
  const { id, access, email } = useSelector((state) => state.auth);

  const fetchProfile = async () => {
    const newProfile = await getUserProfile(id);
    setProfile(newProfile);
  };

  const isUserDataSet = () => {
    let result = true;

    if (profile.first_name === "") {
      result = false;
    }
    if (profile.last_name === "") {
      result = false;
    }
    if (profile.phone === "") {
      result = false;
    }
    if (profile.address === "") {
      result = false;
    }
    if (profile.zipcode === "") {
      result = false;
    }
    if (profile.city === "") {
      result = false;
    }

    return result;
  };

  useEffect(() => {
    if (access) {
      fetchProfile();
    }
  }, [access]);

  return (
    <Layout>
      <header className="landing">
        {access && isUserDataSet() && <p>Witaj {profile.first_name}</p>}
        {access && !isUserDataSet() && (
          <p>Witaj {email}, należy ustawić dane użytkownika</p>
        )}
        {access === undefined && <p>Witaj niezalogowany</p>}
      </header>
    </Layout>
  );
};

export default Landing;
