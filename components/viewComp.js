class View extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.wrapper = document.querySelector(".wrapper");
    this._animation = true;
    this._stop = false;
  }

  set animation(value) {
    this._animation = value;
  }

  set stop(value) {
    this._stop = value;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="styles/style.css">
            <div class="picture__view d-row">
            <img src="/assets/shared/icon-view-image.svg">
            <p class="view-paragraph">view image</p>
            </div>
            `;

    this.pictureView = this.shadowRoot.querySelector(".picture__view");
    this.setListener(this.pictureView);
    this.setAttribute('name', this._animation);
  }

  setListener(element) {
    (this._animation &&
      !this._stop &&
      !this.wrapper.classList.contains("active")) ||
    (this._animation &&
      !this._stop &&
      this.wrapper.classList.contains("active"))
      ? this.addListener(element)
      : this.removeListener(element);
  }

  addListener(element) {
    element.addEventListener("click", () =>
      this.showView(document.querySelector("cart-comp").content)
    );
  }

  removeListener(element) {
    element.removeEventListener("click", () =>
      this.showView(document.querySelector("cart-comp").content)
    );
  }

  showView(data) {
    const wrapper = document.querySelector(".wrapper");
    const div = document.createElement("div");
    div.setAttribute("class", "view");
    div.innerHTML = `
      <div class="view__content">
      <i class="fas fa-solid fa-xmark"></i>
      <picture>
      <source class="image-large" media="(min-width:600px)" srcset=${data.images.gallery}>
      <img class="image-medium" alt="" srcset=${data.images.thumbnail}>
       </picture>
      </div>
      `;
    wrapper.appendChild(div);
    document
      .querySelector(".fa-xmark")
      .addEventListener("click", () => this.closeView(div));
  }

  closeView(element) {
    element.remove();
  }
}

window.customElements.define("view-comp", View);
