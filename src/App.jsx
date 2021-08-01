import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getUserProfile from "./api/accounts/getUserProfile";
import getUserInfo from "./api/auth/getUserInfo";
import "./App.scss";
import Routes from "./components/Routes/Routes";
import { dispatchLogout, setAuthData } from "./redux/actions/authActions";

const App = () => {
  const dispatch = useDispatch();

  const authToken = localStorage.getItem("authToken");
  const fetchUserData = async () => {
    if (authToken) {
      try {
        const userData = await getUserInfo(authToken);
        const { id, email } = userData[0];
        const { type } = await getUserProfile(id);
        dispatch(setAuthData(id, email, authToken, type));
      } catch (e) {
        dispatch(dispatchLogout());
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authToken");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [authToken]);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
