const KEY = "masterpiece"

class Storage {
    constructor(key) {
      this.key = key
    this.storage = sessionStorage;
  }

  setStorage(value) {
    return this.storage.setItem(this.key, JSON.stringify(value));
  }

  getItemStorage() {
    return JSON.parse(this.storage.getItem(this.key));
  }

  clearStorage() {
    this.storage.removeItem(this.key);
  }
}

const storage = new Storage(KEY);
export default storage;
