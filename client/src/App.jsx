/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Home from './layouts/Home';
import Book from './layouts/Book';
import Services from './layouts/Services';
import Contact from './layouts/Contact';
import Login from './layouts/Login';
import Profile from './layouts/Profile';
import ResetPassword from './layouts/ResetPassword';
import NavBar from './components/NavBar';
import SignUp from './layouts/SignUp';
import Confirmation from './layouts/Confirmation';
import Requests from './layouts/admin/Requests';
import AdminServices from './layouts/admin/AdminServices';
import useLogin from './stores/LoginStores';
import useCreditCard from './stores/CreditCardStore';
import Dashboard from './layouts/admin/Dashboard';
import Users from './layouts/admin/Users';
import AdminReviews from './layouts/admin/AdminReviews';

const App = () => {
  const [
    userData,
    loggedIn,
    login,
    register,
    logout,
    changeProfile,
    requestResetPassword,
    requestPasswordUpdate,
  ] = useLogin();
  const [
    newCardToUser,
  ] = useCreditCard();
  const [fromBookPage, setFromBookPage] = useState(false);
  console.log(`Logged In: ${loggedIn}`);
  console.log(`Book Variable: ${fromBookPage} `);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f48fb1',
        light: '#ffc1e3',
        dark: '#bf5f82',
      },
      secondary: {
        main: '#40cec5',
        light: '#7cfff8',
        dark: '#009c95',
      },
      background: {
        main: '#F5F5F6',
        light: '#fafafa',
        dark: '#E1E2E1',
      },
    },
  });

  return (
    <div style={{
      minHeight: '100vh',
    }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar
            loggedIn={loggedIn}
            logout={() => logout()}
            userData={userData}
            fromBookPage={fromBookPage}
            setFromBookPage={setFromBookPage}
          />
          <Switch>
            <Route exact path="/" component={() => <Home loggedIn={loggedIn} setFromBookPage={setFromBookPage} />} />
            <Route path="/book/:id" component={() => <Book userData={userData} newCardToUser={newCardToUser} />} />
            <Route path="/book/" component={() => <Book userData={userData} />} />
            <Route path="/services" component={Services} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={() => <Login login={login} fromBookPage={fromBookPage} resetPassword={requestResetPassword} />} />
            <Route path="/resetpassword/:token" component={() => <ResetPassword attemptReset={requestPasswordUpdate} />} />
            <Route path="/signUp" component={() => <SignUp register={register} login={login} />} />
            <Route
              path="/profile"
              component={() => (
                <Profile
                  userData={userData}
                  logout={() => logout()}
                  changeProfile={changeProfile}
                />
              )}
            />
            <Route path="/confirmation/:id" component={Confirmation} />

            {/* Admin */}
            <Route path="/admin/dashboard" component={() => <Dashboard userData={userData} />} />
            <Route path="/admin/requests" component={Requests} />
            <Route path="/admin/users" component={Users} />
            <Route path="/admin/reviews" component={AdminReviews} />
            <Route path="/admin/services" component={AdminServices} />

            {/* Staff */}
            <Route path="/staff/dashboard" component={() => <Dashboard userData={userData} />} />

          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
