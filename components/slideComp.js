class Slide extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.slidesComp = document.querySelector('slides-comp')
  }

  set content(value) {
    this._content = value;
  }

  get content() {
    return this._content;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="styles/style.css">
    <img class="slide__img" src=".${this._content.images.thumbnail}" alt="${this._content.name}">
    <div class="slide__description">
    <h3 class="slide__title">${this._content.name}</h3>
    <p class="slide__painter">${this._content.artist.name}</p>
    </div>
    <div class="slide__gradient"></div>
    `;
    this.setAttribute('tabindex', 0);
    this.addEventListener("keypress", (e) =>  this.slidesComp.pressEnter(e))
  }
  
}

window.customElements.define("slide-comp", Slide);
