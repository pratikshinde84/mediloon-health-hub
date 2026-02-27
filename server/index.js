const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// static list of medicines; in a real app this would come from a database
const medicines = [
  {
    id: "88ecd169-54ef-4774-a7e4-b609a459c339",
    name: "Paracetamol 500mg",
    brand: "Cipla",
    price: 35,
    originalPrice: 50,
    image_url: "/placeholder.svg",
    aiRecommended: true,
    description: "Paracetamol is used to treat fever and mild to moderate pain.",
  },
  {
    id: "b0a1d2c3-1234-5678-90ab-cdef12345678",
    name: "Amoxicillin 250mg",
    brand: "Sun Pharma",
    price: 120,
    originalPrice: 150,
    image_url: "/placeholder.svg",
    refillSoon: true,
    description: "Antibiotic used for bacterial infections.",
  },
  {
    id: "c9f8e7d6-5432-10fe-dcba-9876543210ab",
    name: "Vitamin D3 Drops",
    brand: "HealthVit",
    price: 280,
    image_url: "/placeholder.svg",
    aiRecommended: true,
    description: "Vitamin D supplement for bone health.",
  },
];

app.get('/medicines', (req, res) => {
  res.json(medicines);
});

// simple cart storage (in-memory for demo)
let cartItems = [];

app.get('/cart', (req, res) => {
  res.json(cartItems);
});

app.post('/cart', (req, res) => {
  const items = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'expected array of items' });
  }
  // replace entire cart for simplicity
  cartItems = items;
  res.json({ saved: cartItems.length });
});

app.listen(port, () => {
  console.log(`Mediloon API listening on http://localhost:${port}`);
});
