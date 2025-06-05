import mongoose from "mongoose";
import Expense from "../models/expense.model.js";

export const getExpenses = async (req, res) => {
	try {
		const expenses = await Expense.find({});
		res.status(200).json({ success: true, data: expenses });
	} catch (error) {
		console.log("error in fetching expenses:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createExpense = async (req, res) => {
	const expense = req.body; 

	if (!expense.name || !expense.amount || !expense.category ||typeof expense.recurring != 'boolean') {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newExpense = new Expense(expense);

	try {
		await newExpense.save();
		res.status(201).json({ success: true, data: newExpense });
	} catch (error) {
		console.error("Error in creating expense:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateExpense = async (req, res) => {
	const { id } = req.params;

	const expense = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Expense Id" });
	}

	try {
		const updatedExpense = await Expense.findByIdAndUpdate(id, expense, { new: true });
		res.status(200).json({ success: true, data: updatedExpense });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteExpense = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Expense Id" });
	}

	try {
		await Expense.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Expense deleted" });
	} catch (error) {
		console.log("error in deleting Expense:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};