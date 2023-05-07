async function getData() {
  try {
    const result = await fetch("/data.json");
    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

const getIndex = () => document.querySelector("cart-comp").content.index;

export  {getData, getIndex};
