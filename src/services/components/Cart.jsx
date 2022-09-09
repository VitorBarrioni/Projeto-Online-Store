import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const cartSaved = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart: cartSaved });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cart.map((itens) => (
            <p key={ itens.name }>
              <span data-testid="shopping-cart-product-name">{itens.name}</span>
              {' '}
              -
              {' '}
              {itens.value}
              {' '}
              -
              {' '}
              <span data-testid="shopping-cart-product-quantity">{itens.quantity}</span>
            </p>
          ))}
      </div>
    );
  }
}
