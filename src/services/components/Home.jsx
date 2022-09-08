import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api';

export default class Home extends Component {
  state = {
    categorias: [],
  };

  async componentDidMount() {
    const categoria = await getCategories();
    this.setState({ categorias: categoria });
  }

  render() {
    const { categorias } = this.state;
    return (
      <div>
        <input type="text" />
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          {categorias.map((item) => (
            <label htmlFor="name" key={ item.id } data-testid="category">
              { item.name }
              {' '}
              <br />
              <input
                key={ item.id }
                type="radio"
                value={ item.name }
              />
            </label>

          ))}
        </div>

      </div>
    );
  }
}
