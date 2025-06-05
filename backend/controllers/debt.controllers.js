import mongoose from "mongoose";
import Debt from "../models/debt.model.js";

export const getDebts = async (req, res) => {
	try {
		const debts = await Debt.find({});
		res.status(200).json({ success: true, data: debts });
	} catch (error) {
		console.log("error in fetching debts:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createDebt = async (req, res) => {
	const debt = req.body; 

	if (!debt.name || !debt.amount || !debt.interest || !debt.end_date) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newDebt = new Debt(debt);

	try {
		await newDebt.save();
		res.status(201).json({ success: true, data: newDebt });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateDebt = async (req, res) => {
	const { id } = req.params;

	const debt = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Debt Id" });
	}

	try {
		const updatedDebt = await Debt.findByIdAndUpdate(id, debt, { new: true });
		res.status(200).json({ success: true, data: updatedDebt });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteDebt = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Debt Id" });
	}

	try {
		await Debt.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Debt deleted" });
	} catch (error) {
		console.log("error in deleting debt:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};