require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(
  cors({
    origin: ["https://shop-hub-rho.vercel.app/", "http://localhost:5173/"],
  })
);

// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity ? product.quantity : 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://shop-hub-rho.vercel.app/success",
    cancel_url: "https://shop-hub-rho.vercel.app/cancel",
  });

  res.json({ id: session.id });
});

app.listen(8232, () => {
  console.log("server start");
});
