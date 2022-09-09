import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../api';

export default class Home extends Component {
  state = {
    categorias: [],
    name: '',
    itens: [],
    click: false,
  };

  async componentDidMount() {
    const categoria = await getCategories();
    this.setState({ categorias: categoria });
  }

  handleClick = async () => {
    const { name } = this.state;
    const itens = await getProductsFromCategoryAndQuery('', name);
    const { results } = itens;
    this.setState({
      itens: results,
      click: results.length === 0,
    });
    console.log(itens.results);
  };

  handleChange = ({ target }) => {
    this.setState({
      name: target.value,
    });
  };

  handleRadio = async ({ target }) => {
    const { id } = target;
    const categories = await getProductsFromCategoryAndQuery(id);
    this.setState({ itens: categories.results });
    // console.log(categories);
  };

  render() {
    const { categorias, name, itens, click } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          {' '}
          Pesquisar
          {' '}
        </button>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          {categorias.map((item) => (
            <p key={ item.id }>
              <label htmlFor={ item.id } data-testid="category">
                {' '}
                <input
                  id={ item.id }
                  type="radio"
                  value={ item.name }
                  name="categoria"
                  onChange={ this.handleRadio }
                />
                {item.name}
              </label>
            </p>
          ))}
        </div>
        <section>
          {itens.map((ele) => (
            <div key={ ele.id } data-testid="product">
              <p>{ele.title}</p>
              <img src={ ele.thumbnail } alt={ ele.title } />
              <p>{ele.price}</p>
            </div>
          ))}
          {click && 'Nenhum produto foi encontrado'}
        </section>
      </div>
    );
  }
}
