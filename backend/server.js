// backend/server.js
const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.post("/store-token", (req, res) => {
  const { token, email } = req.body;

  if (!token || !email) {
    return res.status(400).send("Missing token or email");
  }

  // Build new .env content
  const envContent = `
FIREBASE_API_KEY=${process.env.FIREBASE_API_KEY}
USER_ID_TOKEN=${token}
USER_EMAIL=${email}
`.trim();

  fs.writeFileSync(".env", envContent); // Save to .env
  console.log("Token & email saved to .env");
  res.send("Auth token saved.");
});

app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});
