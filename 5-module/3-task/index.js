function initCarousel() {
  
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let width = document.querySelector(".carousel__inner").offsetWidth;
  let count = 1;

  arrowLeft.style.display = 'none';
  
  arrowRight.onclick = function(){
    arrowLeft.style.display = '';
    if (count==3) { 
      arrowRight.style.display = 'none';
    }
    document.querySelector(".carousel__inner").style.transform = `translateX(-${count * width}px)`;
    count++;
}

 arrowLeft.onclick = function(){
  count--;
  arrowRight.style.display = '';
  if (count==1) { 
    arrowLeft.style.display = 'none';
  }
    document.querySelector(".carousel__inner").style.transform = `translateX(-${(count-1)*width}px)`;
  }
}
  
