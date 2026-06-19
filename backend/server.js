const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ✅ Pehle app banao
const app = express();
const mongoose = require("mongoose");

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.log("MongoDB error:", err));

// ✅ Phir saare imports
const authRoutes = require("./routes/auth");
const departmentRoutes = require("./routes/departmentRoutes"); 
const libraryFormRoute = require("./routes/libraryFormroute.js");

// Middleware (permission system iske bina browser block kar deta hai request ko)
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));
app.use(express.json());
 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);
app.use('/api/general-form', require('./routes/generalForm'));
app.use("/api/library-form", libraryFormRoute);


app.use('/uploads', express.static('uploads')); // ← sirf EK BAAR — yahi rakho

app.get("/api/items", (req, res) => {
  res.status(200).json({ message: "Get All items" });
});



// Server start
app.listen(8000, () => console.log(`Server is listening on 8000`));