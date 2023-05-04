class Slide extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/style.css">
        <img class="slide__img" src="${this._content.images.thumbnail}" alt="starry-night">
          <div class="slide__description">
              <h3 class="slide__title">${this._content.name}</h3>
              <p class="slide__painter">${this._content.artist.name}</p>
              </div>
        <div class="slide__gradient"></div>
        `;
  }

  set content(value) {
    this._content = value;
  }

  get content() {
    return this._content;
  }
}

window.customElements.define("slide-comp", Slide);
