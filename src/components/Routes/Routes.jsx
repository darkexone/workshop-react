import { Switch, Route } from "react-router";
import { useSelector } from "react-redux";
import About from "../../containers/About";
import Jobs from "../../containers/Jobs";
import Landing from "../../containers/Landing";
import Login from "../../containers/Login";
import Profile from "../../containers/Profile";
import Register from "../../containers/Register";
import Shop from "../../containers/Shop";
import Order from "../../containers/Order";
import NewJob from "../../containers/NewJob";
import Complaints from "../../containers/Complaints";
import NewComplaint from "../../containers/NewComplaint";
import Orders from "../../containers/Orders";
import Contact from "../../containers/Contact";

const Routes = () => {
  const { access, type } = useSelector((state) => state.auth);

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      {access && <Route exact path="/jobs" component={Jobs} />}
      <Route path="/about" component={About} />
      <Route path="/shop" component={Shop} />
      <Route path="/contact" component={Contact} />
      {access !== undefined && (
        <Route path="/orders" exact component={Orders} />
      )}
      {access === undefined && <Route path="/login" component={Login} />}
      {access === undefined && <Route path="/register" component={Register} />}
      {access && <Route path="/profile" component={Profile} />}
      {access && <Route path="/order" component={Order} />}
      {access && type === 1 && <Route path="/jobs/add" component={NewJob} />}
      {access && <Route exact path="/complaints" component={Complaints} />}
      {access && (
        <Route path="/complaints/new/:type/:id" component={NewComplaint} />
      )}
      <Route component={Landing} />
    </Switch>
  );
};

export default Routes;
