const express = require("express");
const path = require("path");
const cors = require("cors");
const mercadopago = require("mercadopago");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

app.post("/api/create-preference", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Compra de Livro - RELIVRO",
          quantity: 1,
          unit_price: 50.00,
          currency_id: "BRL"
        }
      ],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/error",
        pending: "http://localhost:3000/pending"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});