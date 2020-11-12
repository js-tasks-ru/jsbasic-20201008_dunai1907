export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = `
    <div class="slider__thumb">
      <span class="slider__value">${this.value}</span>
    </div>
    
    <div class="slider__progress" style="width: 0%"></div>
    
    <div class="slider__steps">
      <span class="slider__step-active"></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>`
    
    this.elem.addEventListener('click', (event) => this.sliderChanges(event));
  }

sliderChanges(event){
  let left = event.clientX - this.elem.getBoundingClientRect().left;
  let leftRelative = left / this.elem.offsetWidth;
  let steps = this.steps;
  let segments = steps - 1;
  // конкретное положение слайдера
  let approximateValue = leftRelative * segments;
  let value = Math.round(approximateValue);// округление
  let valuePercents = value / segments * 100;

  this.elem.querySelector('.slider__value').innerHTML = value;
  let divSliderSteps = this.elem.querySelector('.slider__steps');
  let spanChild = divSliderSteps.querySelectorAll('div > span');
  for (let i = 0; i < spanChild.length; i++){
    spanChild[i].classList.remove('slider__step-active');
    if( i === value  ) {
      spanChild[i].classList.add('slider__step-active');
    }
  }
  let thumb = this.elem.querySelector('.slider__thumb');
  let progress = this.elem.querySelector('.slider__progress');
  thumb.style.left = `${valuePercents}%`;
  progress.style.width = `${valuePercents}%`;

  const customEvent = new CustomEvent('slider-change',{
    detail: value,
    bubbles: true
  });
  this.elem.dispatchEvent(customEvent);
}

}
