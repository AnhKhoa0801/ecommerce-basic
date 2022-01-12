// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { saveOrder } from "dataService/orderService";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "not support method" });
  }
  try {
    const order = req.body;
    console.log("order");
    saveOrder(order);
    res.status(200).json("order success!");
  } catch (error) {
    res.status(500).json(error);
  }
}
