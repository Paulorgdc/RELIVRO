const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Configurar credencial do Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

app.post("/criar-preferencia", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Livro de Teste",
          quantity: 1,
          unit_price: 50.00,
          currency_id: "BRL"
        }
      ],
      back_urls: {
        success: "https://www.seusite.com/sucesso",
        failure: "https://www.seusite.com/erro",
        pending: "https://www.seusite.com/pendente"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Servir arquivos estáticos
app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
