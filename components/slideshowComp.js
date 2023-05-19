import { getData, getIndex } from "../tools/index.js";
import storage from "../tools/Storage.js";
import { playMusic, pauseMusic, stopMusic } from "../tools/howler.js";

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
    this.wrapper = document.querySelector(".wrapper");
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
                <p class="header__paragraph header__paragraph--start-stop" tabindex="0">${this._content}</p>
                `;
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
    playMusic();
    this.wrapper.classList.add("active");
    setTimeout(() => {
      this.footerComp = document.querySelector("footer-comp");
      this.viewComp = document
        .querySelector("cart-comp")
        .shadowRoot.querySelector("view-comp");
      this.navComp = this.footerComp.shadowRoot.querySelector("nav-comp");
      this.navComp.animation = false;
      this.navComp.stop = true;
      this.viewComp.animation = false;
      this.viewComp.stop = true;
      this.navComp.connectedCallback();
      this.viewComp.connectedCallback();
    }, 200);
    this.start = !this.start;
    this.matchContent(STOP);
    getData().then((data) =>
      this.setAnimationStart(data, document.querySelector("slides-comp"))
    );
  }

  stopShow() {
    this.start = !this.start;
    this.navComp.animation = true;
    this.navComp.stop = false;
    this.viewComp.animation = true;
    this.viewComp.stop = false;
    this.viewComp.connectedCallback();
    this.navComp.connectedCallback();
    this.matchContent(START);
    clearInterval(this.interval);
    pauseMusic()
    
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
    storage.clearStorage();
    this.footerComp = document.querySelector("footer-comp");
    this.navComp = this.footerComp.shadowRoot.querySelector("nav-comp");
    const cartComp = document.querySelector("cart-comp");
    this.navComp.animation = true;
    this.interval = setInterval(() => {
      this.index++;
      this.prepareComponent(cartComp, value);
      storage.setStorage(cartComp.content);
      this.prepareComponent(this.footerComp, value);
      if (this.index == 14) this.backToSlidesComp(cartComp, this.footerComp);
      return;
    }, 6000);
  }

  prepareComponent(component, value) {
    component.content = value[this.index];
    component.render(component.content);
  }

  backToSlidesComp() {
    setTimeout(() => {
      this.wrapper.classList.remove("active");
      this.matchContent(START);
      clearInterval(this.interval);
      const headerComp = document.querySelector("header-comp");
      const galleria = headerComp.shadowRoot.querySelector(".header__logo");
      headerComp.backToGalleria(galleria);
      this.start = !this.start;
      this.matchContent(START);
      return;
    }, 2000);
  }

  matchContent(value) {
    this.content = value;
    this.render();
  }

  finishShow(cartComp, value) {
    clearInterval(this.interval);
    cartComp.content = value[0];
    cartComp.render(cartComp, this.content);
    this.matchContent(START);
    this.index = 0;
    storage.setStorage(cartComp.content);
    stopMusic();
    return;
  }
}

window.customElements.define("slideshow-comp", Slideshow);
