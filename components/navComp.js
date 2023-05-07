import {getData, getIndex} from "../tools/index.js";
import storage from "../tools/Storage.js";

class Nav extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.setAttribute(
      "name",
      document.querySelector("footer-comp").content.name
    );
    getData().then((data) => this.setCartInitialValues(data));
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/styles/style.css">
            <div class="footer__right d-row">
            <img class="back" src="/assets//shared/icon-back-button.svg" alt="back" tabindex="0">
            <img class="forward" src="/assets//shared/icon-next-button.svg" alt="forward" tabindex="0">
            </div
            `;

    this.shadowRoot
      .querySelector(".back")
      .addEventListener("click", () => this.previousSlide());
    this.shadowRoot
      .querySelector(".forward")
      .addEventListener("click", () => this.nextSlide());
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(name, oldVal, newVal);
  }

  previousSlide() {
    this.index = getIndex();
    this.index--;
    if (this.index < 1) {
      this.index = 0;
      this.renderComponents();
      return;
    }
    this.renderComponents();
  }
  nextSlide() {
    this.index = getIndex();
    this.index++;
    console.log(this.index);
    if (this.index === this.valuesLength) {
      this.index = 0;
      this.renderComponents();
      return;
    }
    this.renderComponents();
  }

  renderComponents() {
    this.renderCartComp(this.index);
    this.renderFooterComp(this.index);
  }

  renderCartComp(index) {
    const cartComp = document.querySelector("cart-comp");
    cartComp.content = this.data[index];
    cartComp.render();
    storage.setStorage(cartComp.content);
  }
  renderFooterComp(index) {
    const footerComp = document.querySelector("footer-comp");
    footerComp.content = this.data[index];
    footerComp.render();
  }

  setCartInitialValues(values) {
    this.data = values;
    this.valuesLength = values.length;
    this.index = getIndex();
  }
}

window.customElements.define("nav-comp", Nav);
