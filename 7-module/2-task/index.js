import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('modal');
    
    let windowContain = `<!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"> </h3>
      </div>
      <div class="modal__body"> </div>
    </div>`;

    this.elem.innerHTML = windowContain;
    let close = this.elem.querySelector('.modal__close');
    close.addEventListener('click', () => this.modalClick());
    
    document.addEventListener('keydown', this.escapeClose);
  }

  escapeClose = () => {
     
      this.elem.remove();
      document.body.classList.remove('is-modal-open');
      document.removeEventListener('keydown', this.escapeClose);
  }
  

  modalClick() {
   // this.elem.innerHTML = '';
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.escapeClose);
  }

  open(){
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

 setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(modalBody){ 
  let modalBodyAdd = this.elem.querySelector('.modal__body');
  modalBodyAdd.innerHTML = '';
  modalBodyAdd.append(modalBody);
  }

  close(){
    //this.elem.innerHTML = '';
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.escapeClose);
  }
}
/*document.addEventListener('keydown', function (event){
  if (event.code === 'Escape'){
    event.escapeClose;
  }
});*/
