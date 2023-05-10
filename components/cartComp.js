import { getIndex } from "../tools/index.js";
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

  get content() {
    return this._content;
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
    <view-comp></view-comp>
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
      const galleriaLogo = document
        .querySelector("header-comp")
        .shadowRoot.querySelector(".header__logo");
      this.changeStye(galleriaLogo);
    }, 20);
  }

  render() {
    if (!this.content) return;
    this.shadowRoot
      .querySelector(".image-large")
      .setAttribute("srcset", this._content.images.hero.large);
    this.shadowRoot
      .querySelector(".image-medium")
      .setAttribute("srcset", this._content.images.hero.small);
    this.shadowRoot.querySelector(".picture__name").textContent =
      this._content.name;
    this.shadowRoot.querySelector(".picture__painter").textContent =
      this._content.artist.name;
    this.shadowRoot
      .querySelector(".picture__img--smallest")
      .setAttribute("src", this._content.artist.image);
    this.shadowRoot.querySelector(".description__year").textContent =
      this._content.year;
    this.shadowRoot.querySelector(".description__paragraph").textContent =
      this._content.description;
    this.shadowRoot
      .querySelector(".source")
      .setAttribute("href", this._content.source);
  }

  changeStye(element) {
    element.style.opacity = 0.8;
    element.style.cursor = "pointer";
  }
}

window.customElements.define("cart-comp", Cart);
