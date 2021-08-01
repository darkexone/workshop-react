import PropTypes from "prop-types";
import Menu from "./Menu";

const Layout = ({ children }) => (
  <div>
    <Menu />
    {children}
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
