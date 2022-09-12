import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../api';
import { addCart } from '../updateCart';

class Product extends React.Component {
  state = {
    produto: {},
    cart: [],
  };

  componentDidMount() {
    this.requisicao();
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cart: savedCart });
  }

  requisicao = () => {
    const { match } = this.props;
    const { id } = match.params;

    getProductById(id).then((response) => {
      this.setState({ produto: response });
    });
  };

  addProductToCart = () => {
    const { cart, produto } = this.state;
    const cartSaved = addCart(produto, cart);
    this.setState({ cart: cartSaved });
  };

  render() {
    const { produto } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{ produto.title }</h1>
        <img
          src={ produto.thumbnail }
          alt={ produto.title }
          data-testid="product-detail-image"
        />
        <h2 data-testid="product-detail-price">
          {`R$: ${produto.price}`}
        </h2>
        <h3>Especificações Técnicas</h3>

        <ul>
          <li>{ produto.warranty }</li>
          <li>{ produto.subtitle }</li>
        </ul>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addProductToCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Product;
