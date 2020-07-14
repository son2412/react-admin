import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Account/Login";
import Admin from "./components/Admin/Admin";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { AccountRoute } from "./common/components/AccountRoute";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <PrivateRoute path="/">
            <Admin />
          </PrivateRoute>
          <AccountRoute path="/login"><Login /></AccountRoute>
        </Switch>
        <ToastContainer hideProgressBar />
      </Router>
    </div>
  );
};

export default App;
