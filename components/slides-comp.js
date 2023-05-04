import getData from "../tools/getData.js";

class Slides extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    shadowRoot.innerHTML = `<link rel="stylesheet" href="/styles/style.css">`;
      this.wrapper = document.querySelector(".wrapper");
    }
    
    connectedCallback() {
        getData().then((data) =>
        data.forEach((element) => {
            const slideComp = document.createElement("slide-comp");
            slideComp.setAttribute('class', 'slide')
          console.log(slideComp);
          slideComp.content = element;
          this.shadowRoot.appendChild(slideComp)
      })
    );
  }
}

window.customElements.define("slides-comp", Slides);
