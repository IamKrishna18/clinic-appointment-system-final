const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);

// ✅ Add your auth routes here:
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Hospital booking route
app.post("/hospitals", (req, res) => {
  console.log("✅ Received booking for:", req.body);
  res.status(200).json({ message: "Hospital received booking request" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
