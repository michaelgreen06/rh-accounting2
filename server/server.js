const express = require("express");
const knex = require("knex");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Initialize Knex
const db = knex({
  client: "pg",
  connection: {
    host: "your_host",
    user: "your_user",
    password: "your_password",
    database: "your_database",
  },
});

// API endpoint to handle the form submission
app.post("/api/transactions", async (req, res) => {
  const { member, amount, transactiontype, date, category, description } = req.body;
  try {
    await db("transactions").insert({
      member,
      amount,
      transactiontype,
      date,
      category,
      description,
      status: "pending", // Add a status field for approval process
    });
    res.status(201).json({ message: "Transaction stored successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error storing transaction." });
  }
});

// API endpoint to retrieve transactions for approval
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await db("transactions").where("status", "pending").select("*");
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving transactions." });
  }
});

// API endpoint to approve or deny a transaction
app.put("/api/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'denied'
  try {
    await db("transactions").where({ id }).update({ status });
    res.status(200).json({ message: `Transaction ${status} successfully.` });

    // If approved, you would add logic here to submit to Xero API
    if (status === "approved") {
      // TODO: Implement Xero API submission
      // This is where you'd call the Xero API to submit the approved transaction
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating transaction status." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
