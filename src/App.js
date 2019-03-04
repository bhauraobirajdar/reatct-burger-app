import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

import Orders from './containers/Orders/Orders'
import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import { Reducer } from './stote/reducer';

const store = createStore(Reducer);

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Layout>
              <Route path="/" exact  component={BurgerBuilder}></Route>
              <Route path="/checkout" component={Checkout}></Route>
              <Route path="/orders" component={Orders}></Route>
            </Layout>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
