export async function getCategories() {
  const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(ENDPOINT);
  const result = await request.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const request = await fetch(ENDPOINT);
  const result = await request.json();
  return result;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
