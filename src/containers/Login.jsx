import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../components/Shared/Layout";
import { dispatchLogin } from "../redux/actions/authActions";
import "../style/containers/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(dispatchLogin(email, password));
    history.push("/");
  };

  return (
    <Layout>
      <div className="login">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="login-email">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="login-password">
            <label htmlFor="password">
              Hasło:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Zaloguj</button>
          </div>
        </form>
        <a href="/register">Załóż konto</a>
      </div>
    </Layout>
  );
};

export default Login;
