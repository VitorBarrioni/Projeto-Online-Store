import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const cartSaved = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart: cartSaved || [] });
  }

  updateQuantity = (operation, product) => {
    // if (product.quantity === 1 && operation === 'decrease') {
    //   return null;
    // } //solucao opcional se nao quiser colocar condicao no desabilitar o botao
    const { cart } = this.state;
    const updatedCart = cart.map((element) => {
      if (product.name === element.name) {
        if (operation === 'increase') {
          element.quantity += 1;
        } else {
          element.quantity -= 1;
        }
      }
      return element;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.setState({ cart: updatedCart });
  };

  removeProduct = (product) => {
    const { cart } = this.state;
    const updatedCart = cart.filter((element) => element.name !== product.name);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.setState({ cart: updatedCart });
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cart.map((itens) => (
            <p key={ itens.name }>
              <button
                type="button"
                onClick={ () => this.removeProduct(itens) }
                data-testid="remove-product"
              >
                X
              </button>
              <span data-testid="shopping-cart-product-name">{itens.name}</span>
              {' '}
              -
              {' '}
              {itens.value}
              {' '}
              -
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.updateQuantity('decrease', itens) }
                disabled={ itens.quantity < 2 } // solucao mais simples sugerida pelo Anderson Nunes
              >
                {' '}
                -
              </button>
              <span data-testid="shopping-cart-product-quantity">{itens.quantity}</span>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.updateQuantity('increase', itens) }
              >
                +
              </button>
            </p>
          ))}
      </div>
    );
  }
}
