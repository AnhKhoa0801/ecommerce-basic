// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { saveOrder } from "dataService/orderService";
import { getOrders } from "dataService/orderService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const order = req.body;
      saveOrder(order);
      res.status(200).json("order success!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    const orders = await getOrders();
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "not support method" });
  }
}
