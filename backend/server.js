import express from 'express'
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import expenseRoutes from "./routes/expense.routes.js";
import incomeRoutes from "./routes/income.routes.js";
import debtRoutes from "./routes/debt.routes.js";
import { connect } from 'mongoose';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use("/api/expenses",expenseRoutes);
app.use("/api/incomes",incomeRoutes);
app.use("/api/debts",debtRoutes);

app.get("/finances", (req, res) => {
    res.send("Finance API check");
});

console.log(process.env.MONGO_URI);

app.listen(5000,() => {
    console.log("server started");
});

