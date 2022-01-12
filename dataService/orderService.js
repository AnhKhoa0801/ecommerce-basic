export const saveOrder = (order) => {
  try {
    const fs = require("fs");
    let ordersJson = fs.readFileSync("./dataService/order.json", "utf-8");
    let orders = JSON.parse(ordersJson);
    orders.push(order);
    ordersJson = JSON.stringify(orders, null, 4); // pretty
    fs.writeFileSync("./dataService/order.json", ordersJson, "utf-8");
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
