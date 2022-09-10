import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './services/components/Home';
import Cart from './services/components/Cart';
import Product from './services/components/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } />
          <Route path="/product/:id" component={ Product } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
