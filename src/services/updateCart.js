export function addLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addCart(target, cart) {
  const isTrue = cart.some((product) => product.name === target.title);
  if (isTrue) {
    const currProduct = cart.map((product) => {
      if (product.name === target.title) {
        product.quantity += 1;
      }
      return product;
    });
    addLocalStorage(currProduct);
  } else {
    const product = {
      name: target.title,
      value: target.price,
      quantity: 1,
    };
    const cartToSave = [...cart, product];
    addLocalStorage(cartToSave);
    return cartToSave;
  }
}
