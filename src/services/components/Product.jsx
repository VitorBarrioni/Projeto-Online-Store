import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../api';

class Product extends React.Component {
  state = {
    produto: {},
  };

  componentDidMount() {
    this.requisicao();
  }

  requisicao = () => {
    const { match } = this.props;
    const { id } = match.params;

    getProductById(id).then((response) => {
      this.setState({ produto: response });
    });
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
