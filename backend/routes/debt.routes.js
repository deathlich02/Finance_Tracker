import express from "express";
import { getDebts, createDebt, updateDebt, deleteDebt } from "../controllers/debt.controllers.js";

const router = express.Router();

router.get("/", getDebts);

router.post("/", createDebt);

router.put("/:id", updateDebt);

router.delete("/:id", deleteDebt);


export default router;