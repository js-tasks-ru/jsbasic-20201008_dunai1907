import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  
  constructor(card) {
    this.elem = document.createElement('div');
    this.render(card);
    this.elem.querySelector('.card__button').addEventListener('click', () => this.onClick());
    this.id = card.id;
  }
onClick() {
  const customEvent = new CustomEvent("product-add", {
    detail: this.id, 
    bubbles: true 
  });
  this.elem.querySelector('.card__button').dispatchEvent(customEvent);
}
  render (card) {

    this.elem.innerHTML = `<div class="card__top">
    <img src="/assets/images/products/${card.image}" class="card__image" alt="product">
    <span class="card__price">€${card.price.toFixed(2)}</span>
  </div>
  <div class="card__body">
    <div class="card__title">${card.name}</div>
    <button type="button" class="card__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>`
  }
}

