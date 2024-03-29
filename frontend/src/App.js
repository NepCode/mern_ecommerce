import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import {ProductScreen} from "./screens/ProductScreen";
import {CartScreen} from "./screens/CartScreen";
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { ProfileScreen } from './screens/auth/ProfileScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import  PaymentScreen  from './screens/PaymentScreen';
import  PlaceOrderScreen  from './screens/PlaceOrderScreen';
import  OrderScreen  from './screens/OrderScreen';
import  MyOrdersScreen  from './screens/MyOrdersScreen';
import  OrderListScreen  from './screens/admin/OrderListScreen';
import  OrderEditScreen  from './screens/admin/OrderEditScreen';
import  UserListScreen  from './screens/admin/UserListScreen';
import  UserEditScreen  from './screens/admin/UserEditScreen';
import  ProductListScreen  from './screens/admin/ProductListScreen';
import  ProductEditScreen  from './screens/admin/ProductEditScreen';
import  ErrorNotFound  from './components/ErrorNotFound';

const App = () => {
  return (
    <>
    <Router>
    <Header/>
      <main className="py-3">
        <Container>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Route exact path='/cart/:id?' component={CartScreen} />
          <Route exact path='/shipping' component={ShippingScreen} />
          <Route exact path='/payment' component={PaymentScreen} />
          <Route exact path='/placeorder' component={PlaceOrderScreen} />
          <Route exact path='/order/:id' component={OrderScreen} />
          <Route exact path='/myorders' component={MyOrdersScreen} />
          
          {/* admin routes */}
          <Route exact path='/usersList' component={UserListScreen} />
          <Route exact path='/user/:id/edit' component={UserEditScreen} />
          <Route exact path='/productsList' component={ProductListScreen} />
          <Route exact path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route exact path='/admin/ordersList' component={OrderListScreen} />
          <Route exact path='/admin/order/:id/edit' component={OrderEditScreen} />

          {/* 404 page */}
          <Route path="*" component={ErrorNotFound} />
        </Switch>
        </Container>
      </main>
    <Footer/>
    </Router>
   </>
  );
}

export default App;
