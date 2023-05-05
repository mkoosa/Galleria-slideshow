class Header extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.setAttribute("class", "header d-row");
  }

  connectedCallback() {
      this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/styles/style.css">
            <img class="header__logo" src="/assets/shared/logo.svg" alt="logo">
            <p class="header__paragraph header__paragraph--start-stop" tabindex="0">start slideshow</p>
            `;
    }    
}

window.customElements.define("header-comp", Header);


