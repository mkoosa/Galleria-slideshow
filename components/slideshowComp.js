import { getData, getIndex } from "../tools/index.js";
import storage from "../tools/Storage.js";
const START = "start slideshow";
const STOP = "stop slideshow";

class Slideshow extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.start = false;
    this._content = START;
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
                <p class="header__paragraph header__paragraph--start-stop" tabindex="0">${this._content}</p>
                `;

    const galleria = this.shadowRoot.querySelector(".header__logo");
    this.addEventListener("click", () => {
      !this.start ? this.startShow() : this.stopShow();
      this.render();
    });
  }

  render() {
    this.shadowRoot.querySelector(
      ".header__paragraph--start-stop"
    ).textContent = this.content;
  }

  startShow() {
    this.start = !this.start;
    this.matchContent(STOP);
    getData().then((data) =>
      this.setAnimationStart(data, document.querySelector("slides-comp"))
    );
  }

  setAnimationStart(value, comp) {
    comp
      ? this.animationFromTheBeginning(value, comp)
      : this.animationFromIndex(value, comp);
  }

  animationFromTheBeginning(value, comp) {
    this.index = 0;
    comp.addComponents(value[this.index]);
    this.animationEngine(value);
  }

  animationFromIndex(values) {
    if (storage.getItemStorage()) {
      this.index = getIndex();
    }
    this.animationEngine(values);
  }

  animationEngine(value) {
    this.interval = setInterval(() => {
      const cartComp = document.querySelector("cart-comp");
      this.index++;
      this.prepareComponent(cartComp, value)  
      storage.setStorage(cartComp.content);
      const footerComp = document.querySelector("footer-comp");
      this.prepareComponent(footerComp, value)  
      if (this.index == 14) this.backToSlidesComp(cartComp, footerComp);
      return;
    }, 500);
  }
  
  prepareComponent(component, value) {
    component.content = value[this.index];
    component.render(component.content);
  }

  backToSlidesComp() {
    setTimeout(() => {
      this.matchContent(START);
      clearInterval(this.interval);
      const headerComp = document.querySelector("header-comp");  
      const galleria = headerComp.shadowRoot.querySelector(".header__logo");
      headerComp.backToGalleria(galleria);
      return;
    }, 500);
  }
  
  matchContent(value) {
    this.content = value;
    this.render();
  }
  
  stopShow() {
    console.log('stop');
    this.start = !this.start;
    this.matchContent(START);
    clearInterval(this.interval);
  }

  finishShow(index, cartComp, value) {
    clearInterval(this.interval);
    cartComp.content = value[0];
    cartComp.render(cartComp, this.content);
    this.matchContent(START);
    this.index = 0;
    storage.setStorage(cartComp.content);
    return;
  }
}

window.customElements.define("slideshow-comp", Slideshow);
