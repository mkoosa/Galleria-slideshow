async function getData() {
    try {
        const result = await fetch("/data.json");
        const data = await result.json();
        return data;
        
    } catch (error) {
        console.log(error);
    }
};

export default getData