class Footer extends HTMLElement {
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
        <link rel="stylesheet" href="styles/style.css">
        <footer class="footer">
        <div class="footer__content">
        <div class="footer__left">
        <p class="footer__painting">${this._content.name}</p>
        <p class="footer__painter">${this._content.artist.name}</p>
        </div>
        <div class="footer__right d-row">
        <nav-comp></nav-comp>
        </div>
        </div>
        </footer>
        `;
  }

  render() {
    if(!this.content) return
    this.shadowRoot.querySelector('.footer__painting').textContent = this._content.name;
    this.shadowRoot.querySelector('.footer__painter').textContent = this._content.artist.name;
  }
}

window.customElements.define("footer-comp", Footer);
