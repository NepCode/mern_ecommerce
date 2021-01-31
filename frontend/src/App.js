import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import {ProductScreen} from "./screens/ProductScreen";
import {CartScreen} from "./screens/CartScreen";
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { ProfileScreen } from './screens/auth/ProfileScreen';

const App = () => {
  return (
    <>
    <Router>
    <Header/>
      <main className="py-3">
        <Container>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Route exact path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
    <Footer/>
    </Router>
   </>
  );
}

export default App;
