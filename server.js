const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow Frontend to talk to Backend
app.use(express.json()); // Parse JSON bodies

// --- MOCK DATABASE (In-Memory) ---
// In a real app, you would connect to MongoDB or MySQL here.
let contacts = [
  {
    id: 1,
    name: "Alice Chen",
    isFav: true,
    methods: [
      { type: "Phone", val: "123-456-7890" },
      { type: "Email", val: "alice@example.com" }
    ]
  },
  {
    id: 2,
    name: "Bob Jones",
    isFav: false,
    methods: [
      { type: "WeChat", val: "bob_j" },
      { type: "Address", val: "123 Tech Park" }
    ]
  }
];

// --- API ROUTES ---

// GET: Fetch all contacts
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

// POST: Create a new contact
app.post('/api/contacts', (req, res) => {
  const newContact = {
    ...req.body,
    id: Date.now() // Generate ID on server
  };
  contacts.push(newContact);
  console.log(`Created: ${newContact.name}`);
  res.json(newContact);
});

// PUT: Update an existing contact
app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  // Find and update
  contacts = contacts.map(c =>
    c.id == id ? { ...updatedData, id: Number(id) } : c
  );

  console.log(`Updated ID: ${id}`);
  res.json(updatedData);
});

// DELETE: Remove a contact
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter(c => c.id != id);
  console.log(`Deleted ID: ${id}`);
  res.json({ success: true });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});