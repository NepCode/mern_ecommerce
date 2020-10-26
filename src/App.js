import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./Screens/HomeScreen";
import {ProductScreen} from "./Screens/ProductScreen";
import {CartScreen} from "./Screens/CartScreen";

const App = () => {
  return (
    <>
    <Router>
    <Header/>
      <main className="py-3">
        <Container>
          <Route exact path='/' component={HomeScreen} />
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
