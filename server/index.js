const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const { redirectUrl } = require("./controllers/urlController");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", urlRoutes);

// Redirect route
app.get("/:shortCode", redirectUrl);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));