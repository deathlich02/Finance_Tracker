import mongoose from "mongoose";
import Income from "../models/income.model.js";

export const getIncomes = async (req, res) => {
	try {
		const incomes = await Income.find({});
		res.status(200).json({ success: true, data: incomes });
	} catch (error) {
		console.log("error in fetching incomes:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createIncome = async (req, res) => {
	const income = req.body; 

	if (!income.name || !income.amount || !income.category ||typeof income.recurring != 'boolean') {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newIncome = new Income(income);

	try {
		await newIncome.save();
		res.status(201).json({ success: true, data: newIncome });
	} catch (error) {
		console.error("Error in Create income:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateIncome = async (req, res) => {
	const { id } = req.params;

	const income = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Income Id" });
	}

	try {
		const updatedIncome = await Income.findByIdAndUpdate(id, income, { new: true });
		res.status(200).json({ success: true, data: updatedIncome });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteIncome = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Income Id" });
	}

	try {
		await Income.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Income deleted" });
	} catch (error) {
		console.log("error in deleting income:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};