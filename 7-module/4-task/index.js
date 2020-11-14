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
    
    <div class="slider__steps"></div>`;
    let sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 1; i <=steps ; i++) {
      sliderSteps.insertAdjacentHTML("afterbegin",'<span></span>');
   };
   let spanChild = sliderSteps.querySelectorAll('div > span');
   for (let i = 0; i < spanChild.length; i++){
    if( i === 0  ) {
      spanChild[i].classList.add('slider__step-active');
    }
  }
    this.sliderMove();
  }

  sliderMove(){
    let steps = this.steps;
    let thumb = this.elem.querySelector('.slider__thumb');
    
    thumb.addEventListener('pointerdown', () => {
      
       
    const onMove = (event) => { 
      this.elem.classList.add('slider_dragging');
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }
      if (leftRelative > 1) {
        leftRelative = 0;
      }

      let progress = this.elem.querySelector('.slider__progress');

      //let steps = this.steps;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let leftPercents = leftRelative * 100;
      //let valuePercents = value / segments * 100;
    
      this.elem.querySelector('.slider__value').innerHTML = value;
      let divSliderSteps = this.elem.querySelector('.slider__steps');
      let spanChild = divSliderSteps.querySelectorAll('div > span');
      
       for (let i = 0; i < spanChild.length; i++){
        spanChild[i].classList.remove('slider__step-active');
         if( i === value  ) {
           spanChild[i].classList.add('slider__step-active');
        }
      }
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    };

       document.addEventListener('pointermove', onMove);

       
       document.onpointerup = function(event){
        document.removeEventListener('pointermove', onMove);
        document.onpointerup = null;
        document.querySelector('.slider').classList.remove('slider_dragging');
        
        let left = event.clientX - document.querySelector('.slider').getBoundingClientRect().left;
        let leftRelative = left / document.querySelector('.slider').offsetWidth;
        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);// округление
        let valuePercents = value / segments * 100;
        
        let progress = document.querySelector('.slider__progress');
        thumb.style.left = `${valuePercents}%`;
        progress.style.width = `${valuePercents}%`;

        const customEvent = new CustomEvent('slider-change',{
          detail: value, 
          bubbles: true
        })
        document.querySelector('.slider').dispatchEvent(customEvent); 
      }
    });
    
    thumb.ondragstart = () => false;
  };
}

