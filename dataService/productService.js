export const getListProduct = () => {
  const data = require(".//product.json");
  return data;
};

export const getProductById = (productId) => {
  const data = require(".//product.json");
  const idx = data.findIndex((item) => item.id == productId);
  return data[idx];
};
