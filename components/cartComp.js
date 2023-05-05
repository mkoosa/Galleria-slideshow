class Cart extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set content(value) {
    this._content = value;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="/styles/style.css">
    <section class="galleria">
     <div class="picture">
      <div class="picture__container">
      <picture>
       <source class="image-large" media="(min-width:768px)" srcset=${this._content.images.hero.large}>
       <img class="image-medium" alt="" srcset=${this._content.images.hero.small}>
     </picture>
    <view-comp name="${this._content.name}"></view-comp>
     </div>
     <div class="picture__content">
     <div class="picture__details">
     <h1 class="picture__name">${this._content.name}</h1>
            <p class="picture__painter">${this._content.artist.name}</p>
                </div>
            <img class="picture__img picture__img--smallest" alt="" src=${this._content.artist.image}>
            </div>
            </div>
        <div class="description">
    <p class="description__year">${this._content.year}</p>
    <p class="description__paragraph">${this._content.description}</p>
    <a class="source" href=${this._content.source}>go to source</a>
    </div>
    </section>`;
    setTimeout(() => {
      const galleriaLogo = document.querySelector('header-comp').shadowRoot.querySelector('.header__logo'); 
      this.changeStye(galleriaLogo);
    }, 20)
  }
  
  changeStye(element) {
    element.style.opacity = .8;
    element.style.cursor = 'pointer';
  }

}

window.customElements.define("cart-comp", Cart);
