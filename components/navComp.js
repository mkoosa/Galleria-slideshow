import { getData, getIndex } from "../tools/index.js";
import storage from "../tools/Storage.js";

class Nav extends HTMLElement {
  constructor() {
    super();
    this.wrapper = document.querySelector(".wrapper");
    this._animation = true;
    this._stop = false;
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.setAttribute(
      "name",
      document.querySelector("footer-comp").content.name
    );
    getData().then((data) => this.setCartInitialValues(data));
    this.cartComp = document.querySelector("cart-comp");
    this.viewComp = this.cartComp.shadowRoot.querySelector("view-comp");
  }

  set animation(value) {
    this._animation = value;
  }

  set stop(value) {
    this._stop = value;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="/styles/style.css">
    <div class="footer__right d-row">
    <img class="back" src="/assets//shared/icon-back-button.svg" alt="back" tabindex="0">
    <img class="forward" src="/assets//shared/icon-next-button.svg" alt="forward" tabindex="0">
    </div
    `;

    this.targetAnimation(
      this.shadowRoot.querySelector(".back"),
      this.shadowRoot.querySelector(".forward")
    );
  }

  targetAnimation(back, forward) {
    (this._animation &&
      !this._stop &&
      !this.wrapper.classList.contains("active")) ||
    (this._animation &&
      !this._stop &&
      this.wrapper.classList.contains("active"))
      ? this.addListener(back, forward)
      : this.removeLIstener(back, forward);
  }

  addListener(back, forward) {
    back.addEventListener("click", () => this.previousSlide());
    forward.addEventListener("click", () => this.nextSlide());
    back.addEventListener("keypress", (e) => this.pressEnterAndBack(e));
    forward.addEventListener("keypress", (e) => this.pressEnterAndForward(e));
  }

  removeLIstener(back, forward) {
    back.removeEventListener("click", () => this.previousSlide());
    forward.removeEventListener("click", () => this.nextSlide());
    back.removeEventListener("keypress", (e) => this.pressEnterAndBack(e));
    forward.removeEventListener("keypress", (e) =>
      this.pressEnterAndForward(e)
    );
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
    if (this.index === this.valuesLength) {
      this.index = 0;
      this.renderComponents();
      return;
    }
    this.renderComponents();
  }

  pressEnterAndBack(e) {
    if (e.key === "Enter") {
      this.previousSlide();
    }
  }

  pressEnterAndForward(e) {
    if (e.key === "Enter") {
      this.nextSlide();
    }
  }

  renderComponents() {
    this.renderCartComp(this.index);
    this.renderFooterComp(this.index);
  }

  renderCartComp(index) {
    this.cartComp.content = this.data[index];
    this.cartComp.render();
    storage.setStorage(this.cartComp.content);
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
