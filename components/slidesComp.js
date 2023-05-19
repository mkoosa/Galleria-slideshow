import {getData} from "../tools/index.js";
import storage from "../tools/Storage.js";

class Slides extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    shadowRoot.innerHTML = `<link rel="stylesheet" href="styles/style.css">`;
    this.wrapper = document.querySelector(".wrapper");
  }

  connectedCallback() {
    this.setAttribute("class", "slides");
    getData().then((data) =>
      data.forEach((element) => {
        const slideComp = document.createElement("slide-comp");
        slideComp.setAttribute("class", "slide");
        slideComp.content = element;
        this.shadowRoot.appendChild(slideComp);
        slideComp.addEventListener("click", () =>
          this.addComponents(slideComp.content)
        );
      })
    );
    if (this.isStorageEmpty()) return;
    this.addComponents(storage.getItemStorage());
  }

  render() {
    this.setAttribute("class", "slides");
    getData().then((data) =>
      data.forEach((element) => {
        const slideComp = document.createElement("slide-comp");
        slideComp.setAttribute("class", "slide");
        slideComp.content = element;
        slideComp.render();
        slideComp.content = element;
        this.shadowRoot.appendChild(slideComp);
        slideComp.addEventListener("click", () =>
        this.addComponents(slideComp.content)
        );
      })
      );
    }  
    
    pressEnter(e) {
      if (e.key === 'Enter') {
        this.addComponents(e.target.content)
      }
    }
    
    addComponents(value) {
    storage.setStorage(value);
    this.createCartComp(value);
    this.createFooterComp(value);
    this.removeSlidesComp();
  }

  createCartComp(value) {    
    const cartComp = document.createElement("cart-comp");
    cartComp.content = value;
    this.wrapper.appendChild(cartComp);
  }

  createFooterComp(value) {
    const footerComp = document.createElement("footer-comp");
    footerComp.content = value;
    this.wrapper.appendChild(footerComp);
  }

  removeSlidesComp() {
    const main = document.querySelector("main");
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    };
  }

  isStorageEmpty() {
    return storage.getItemStorage() ? false : true;
  }
}



window.customElements.define("slides-comp", Slides);
