import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../api';
import './Home.css';

export default class Home extends Component {
  state = {
    categorias: [],
    name: '',
    itens: [],
    click: false,
    cart: [],
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

  addCart = (target) => {
    const product = {
      name: target.title,
      value: target.price,
    };
    this.setState(
      (prevState) => ({
        cart: [...prevState.cart, product],

      }),
      this.addLocalStorage(),
    );
  };

  addLocalStorage = () => {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
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
            <div key={ ele.id } data-testid="product" className="itens">
              <p>{ele.title}</p>
              <img src={ ele.thumbnail } alt={ ele.title } />
              <p>{ele.price}</p>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.addCart(ele) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
          {click && 'Nenhum produto foi encontrado'}
        </section>
      </div>
    );
  }
}
