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

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/styles/style.css">
        <footer class="footer">
        <div class="footer__content">
        <div class="footer__left">
        <p class="footer__painting">${this._content.name}</p>
        <p class="footer__painter">${this._content.artist.name}</p>
        </div>
        <div class="footer__right d-row">
        <img class="back" src="/assets//shared/icon-back-button.svg" alt="back" tabindex="0">
        <img class="forward" src="/assets//shared/icon-next-button.svg" alt="forward" tabindex="0">
        </div>
        </div>
        </footer>
        `;
  }
}

window.customElements.define("footer-comp", Footer);
