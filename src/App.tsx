import React from 'react';
import './App.css';
import './styles/sb-admin-2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Login from './components/Account/Login';
import Admin from './components/Admin/Admin';
import { PrivateRoute } from './common/components/PrivateRoute';
import { AccountRoute } from './common/components/AccountRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import firebase from 'firebase';
firebase.initializeApp({
  apiKey: 'AIzaSyAfXzdlGIgeuylEg_aTex9KItr5XjSvMGo',
  authDomain: 'chatfirebase-c6acb.firebaseapp.com',
  databaseURL: 'https://chatfirebase-c6acb.firebaseio.com',
  projectId: 'chatfirebase-c6acb',
  storageBucket: 'chatfirebase-c6acb.appspot.com',
  messagingSenderId: '535909429783',
  appId: '1:535909429783:web:3323de1f1bb4ee0ffde252'
});

const App: React.FC = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <PrivateRoute path="/">
            <Admin />
          </PrivateRoute>
          <AccountRoute path="/login">
            <Login />
          </AccountRoute>
          <Redirect to="/admin/home" />
        </Switch>
        <ToastContainer hideProgressBar />
      </Router>
    </div>
  );
};

export default App;
