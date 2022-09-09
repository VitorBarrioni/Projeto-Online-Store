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
    const cartSaved = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cart: cartSaved });
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
    // const req = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
    // const res = await req.json();
    this.setState({ itens: categories.results });
    // console.log(categories);
  };

  addCart = (target) => {
    const { cart } = this.state;
    const isTrue = cart.some((product) => product.name === target.title);
    if (isTrue) {
      const currProduct = cart.map((product) => {
        if (product.name === target.title) {
          product.quantity += 1;
        }
        return product;
      });
      this.addLocalStorage(currProduct);
    } else {
      const product = {
        name: target.title,
        value: target.price,
        quantity: 1,
      };
      const cartToSave = [...cart, product];
      this.addLocalStorage(cartToSave);
      this.setState({
        cart: cartToSave,
      });
    }
  };

  addLocalStorage = (cart) => {
    // const { cart } = this.state;
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
