import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement(`div`);
    this.elem.classList.add('carousel');
    this.render(slides);
    this.switch(slides);
    let keys = this.elem.querySelectorAll('.carousel__button');

    for (let i = 0; i < keys.length; i++){
    keys[i].addEventListener('click', (event) => this.onClick(event));
  }
  }
  onClick(event){
    const customEvent = new CustomEvent('product-add',{
      bubbles: true,
      detail: event.target.closest('.carousel__slide').getAttribute('data-id')
    });
    this.elem.querySelector('.carousel__button').dispatchEvent(customEvent);
  }

  switch(slides){
    let arrowRight = this.elem.querySelector(".carousel__arrow_right");
    let arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    let count = 1;

  arrowLeft.style.display = 'none';
  
  arrowRight.onclick = function(){
    arrowLeft.style.display = '';
    if (count==slides.length-1) { 
      arrowRight.style.display = 'none';
    }
    document.querySelector(".carousel__inner").style.transform = `translateX(-${count * (document.querySelector(".carousel__inner").offsetWidth)}px)`;
    count++;
}

arrowLeft.onclick = function(){
  count--;
  arrowRight.style.display = '';
  if (count==1) { 
    arrowLeft.style.display = 'none';
  }
  document.querySelector(".carousel__inner").style.transform = `translateX(-${(count-1)*(document.querySelector(".carousel__inner").offsetWidth)}px)`;
  }
}

  render(slides){
    
    for (let i=0; i<slides.length; i++){
      this.elem.innerHTML = this.elem.innerHTML + `<div class="carousel__slide" data-id="${slides[i].id}">
      <img src="/assets/images/carousel/${slides[i].image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slides[i].price.toFixed(2)}</span>
        <div class="carousel__title">${slides[i].name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`
     }
      
     this.elem.innerHTML =  `<!--Кнопки переключения-->
     <div class="carousel__arrow carousel__arrow_right">
       <img src="/assets/images/icons/angle-icon.svg" alt="icon">
     </div>
     <div class="carousel__arrow carousel__arrow_left">
       <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
     </div>
 
     <div class="carousel__inner"> ${this.elem.innerHTML} </div>`
  }
}


