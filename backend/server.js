

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoute")
const mongoose = require("mongoose");

const app = express();
const port = process.env.SERVER_PORT || 3000;

// ====================== MIDDLEWARE ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost:5173',   // Vite default port
//   credentials: true
// }));
app.use(cors());
// ====================== VIEW ENGINE ======================
app.set('view engine', 'ejs');
app.set('views', './views');

// ====================== DATABASE ======================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        console.log("Host:", mongoose.connection.host);
        console.log("Database Name:", mongoose.connection.name);
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// ====================== ROUTES ======================
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

app.use('/api', userRoute);
app.use('/', authRoute);

// BLOG ROUTES

app.use("/api/blog", blogRoutes);

// ====================== SERVER ======================
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});