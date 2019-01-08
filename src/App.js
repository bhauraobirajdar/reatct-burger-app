import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

import Orders from './containers/Orders/Orders'
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Route path="/" exact  component={BurgerBuilder}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders}></Route>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;