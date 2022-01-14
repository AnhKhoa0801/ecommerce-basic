export const saveOrder = (order) => {
  try {
    const fs = require("fs");
    let ordersJson = fs.readFileSync("./dataService/order.json", "utf-8");
    let orders = JSON.parse(ordersJson);
    orders.push(order);
    ordersJson = JSON.stringify(orders, null, 4); // pretty
    fs.writeFileSync("./dataService/order.json", ordersJson, "utf-8");
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async () => {
  try {
    const fs = require("fs");
    const data = await fs.readFileSync("./dataService/order.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
