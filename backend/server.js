const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ✅ Pehle app banao
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4  
})
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error:", err));

// ✅ Phir saare imports
const authRoutes = require("./routes/auth");
const departmentRoutes = require("./routes/departmentRoutes"); 
//const assessmentRoutes = require("./routes/assessment");

// Middleware (permission system iske bina browser block kar deta hai request ko)
app.use(cors({
  origin: "http://localhost:1234",  
  credentials: true
}));
app.use(express.json());
 
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes); // ✅ sirf ek baar
//app.use("/api/assessment", assessmentRoutes);
app.use('/uploads', express.static('uploads'))
app.use('/api/general-form', require('./routes/generalForm'))


app.get("/api/items", (req, res) => {
  res.status(200).json({ message: "Get All items" });
});

app.use('/uploads', express.static('uploads'));

// Server start
app.listen(8000, () => console.log(`Server is listening on 8000`));