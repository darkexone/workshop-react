import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import headerImage from "../../images/shared/menu/header_logo.png";
import { dispatchLogout } from "../../redux/actions/authActions";
import "../../style/components/Menu.scss";

const Menu = () => {
  const { access } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnClick = async () => {
    dispatch(dispatchLogout());
  };
  return (
    <div className="header">
      <Link to="/" className="header-logo">
        <img src={headerImage} alt="Header" width="16" height="16" />
      </Link>
      {access !== undefined && <Link to="/jobs">ZLECENIA</Link>}
      {access !== undefined && (
        <Link exact to="/orders">
          ZAMÓWIENIA
        </Link>
      )}
      {access !== undefined && <Link to="/complaints">REKLAMACJE</Link>}
      <Link to="/shop">SKLEP SAMOCHODOWY</Link>
      <Link to="/about">O FIRMIE</Link>
      <Link to="/contact">KONTAKT</Link>
      {access === undefined && <Link to="/login">LOGOWANIE</Link>}
      {access !== undefined && <Link to="/profile">PROFIL</Link>}
      {access && (
        <Link exact to="/order">
          KOSZYK
        </Link>
      )}
      {access && (
        <button type="button" onClick={handleOnClick}>
          WYLOGUJ
        </button>
      )}
      <hr />
    </div>
  );
};

export default Menu;
