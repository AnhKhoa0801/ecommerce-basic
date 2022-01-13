export const getListProduct = () => {
  try {
    const data = require("./product.json");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = (productId) => {
  try {
    const data = require("./product.json");
    const idx = data.findIndex((item) => item.id == productId);
    return data[idx];
  } catch (error) {
    console.log(error);
  }
};
