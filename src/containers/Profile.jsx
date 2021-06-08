import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getUserProfile from "../api/accounts/getUserProfile";
import updateUserProfile from "../api/accounts/updateUserProfile";
import Layout from "../components/Shared/Layout";
import "../style/containers/Profile.scss";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const { id, access } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [zipcode, setZipcode] = useState();
  const [city, setCity] = useState();

  const setFormData = () => {
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setPhone(profile.phone);
    setAddress(profile.address);
    setZipcode(profile.zipcode);
    setCity(profile.city);
  };

  const fetchProfile = async () => {
    const newProfile = await getUserProfile(id);
    setProfile(newProfile);
  };

  useEffect(() => {
    if (access) {
      fetchProfile();
    }
  }, [access]);

  useEffect(() => {
    setFormData();
  }, [profile]);

  const handleSubmit = async () => {
    updateUserProfile(
      profile,
      firstName,
      lastName,
      phone,
      address,
      zipcode,
      city,
    );
  };

  return (
    <Layout>
      <div className="profile">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="firstName">
            Imię:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="lastName">
            Nazwisko:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label htmlFor="phone">
            Numer telefonu:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label htmlFor="address">
            Adres:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label htmlFor="zipcode">
            Kod pocztowy:
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </label>
          <label htmlFor="city">
            Miasto:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <button type="submit">Aktualizuj</button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
