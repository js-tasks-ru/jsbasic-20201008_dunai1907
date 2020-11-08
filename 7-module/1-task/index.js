import createElement from '../../assets/lib/create-element.js';
import categories from './categories.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.render(categories);
    this.buttonClick();
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.addEventListener('scroll', () => this.scrollClick());
    let keys = this.elem.querySelectorAll('.ribbon__item');

    for (let i = 0; i < keys.length; i++){
    keys[i].addEventListener('click', (event) => this.ribbonItemClick(event));
  } 
  }

  ribbonItemClick(event){
    event.preventDefault();

    let keys = this.elem.querySelectorAll('.ribbon__item');
    for (let i=0; i<keys.length; i++){
      if (keys[i].classList.contains('ribbon__item_active')){
        //console.log(keys[i]);
        keys[i].classList.remove('ribbon__item_active');
        //console.log(keys[i].classList.contains('ribbon__item_active'));
      }
    }
    event.target.classList.add('ribbon__item_active');
    //console.log(event.target.classList.contains('ribbon__item_active'));

    const customEvent = new CustomEvent('ribbon-select',{
      bubbles: true,
      detail: event.target.getAttribute('data-id')
    });
    this.elem.querySelector('.ribbon__item').dispatchEvent(customEvent);
  }

  buttonClick() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    
    arrowRight.onclick = function(){
      ribbonInner.scrollBy(350, 0);
      this.scrollClick;
    }
    arrowLeft.onclick = function(){
      ribbonInner.scrollBy(-350, 0);
      this.scrollClick;
    }
  }
    
    scrollClick() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner'); 
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (!arrowLeft.classList.contains('ribbon__arrow_visible')){
        arrowLeft.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1){
          arrowRight.classList.remove('ribbon__arrow_visible');
        }
       // console.log(scrollRight);
      if (scrollRight>1 && !arrowRight.classList.contains('ribbon__arrow_visible')){
          arrowRight.classList.add('ribbon__arrow_visible');
        }
      if (scrollLeft == 0){
          arrowLeft.classList.remove('ribbon__arrow_visible');
        }
      }  

  render(categories) {

    for (let i=0; i<categories.length; i++){
      this.elem.innerHTML = this.elem.innerHTML + `
      <a href="#" class="ribbon__item" 
      data-id="${categories[i].id}">${categories[i].name}</a>`
    }

    this.elem.innerHTML = `<div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">${this.elem.innerHTML}</nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`
  }
  
}
