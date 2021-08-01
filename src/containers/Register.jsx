/* eslint-disable no-alert */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../components/Shared/Layout";
import { dispatchLogin } from "../redux/actions/authActions";
import createUser from "../api/auth/createUser";
import "../style/containers/Register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const access = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 === password2) {
      const response = await createUser(email, password1);
      if (response.ok) {
        alert("Założono konto");
        dispatch(dispatchLogin(email, password1));
        if (access !== undefined) {
          history.push("/");
        }
      }
    } else {
      alert("Podane hasła nie są takie same");
    }
  };

  return (
    <Layout>
      <div className="register">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="register-email">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="register-password">
            <label htmlFor="password">
              Hasło:
              <input
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </label>
          </div>
          <div className="register-repeatPassword">
            <label htmlFor="password">
              Powtórz hasło:
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </label>
            <button type="submit">Załóż konto</button>
          </div>
        </form>
        <a href="/login">Zaloguj</a>
      </div>
    </Layout>
  );
};

export default Register;
