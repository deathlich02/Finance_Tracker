import prisma from "../prisma/db.js";

export async function getExpenses(req, res) {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user.id }
    });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
}

export async function getExpense(req, res) {
  const { id } = req.params;
  try {
    const expense = await prisma.expense.findFirst({
      where: { id: Number(id), userId: req.user.id }
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expense" });
  }
}

export async function addExpense(req, res) {
  const { name, category, amount, date } = req.body;
  try {
    const newExpense = await prisma.expense.create({
      data: {
        userId: req.user.id,
        name,
        category,
        amount: parseFloat(amount),
        ...(date && { date: new Date(date) })
      }
    });
    res.status(201).json(newExpense);
  } catch (err) {
    console.error("Expense creation error:", err);
    res.status(500).json({ error: "Failed to create expense" });
  }
}

export async function updateExpense(req, res) {
  const { id } = req.params;
  const { name, amount, category, date } = req.body;
  try {
    const updated = await prisma.expense.updateMany({
      where: { id: Number(id), userId: req.user.id },
      data: {
        name,
        category,
        amount: parseFloat(amount),
        ...(date && { date: new Date(date) })
      }
    });
    if (updated.count === 0)
      return res.status(404).json({ error: "Expense not found or not yours" });
    res.status(200).json({ message: "Expense updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update expense" });
  }
}

export async function deleteExpense(req, res) {
  const { id } = req.params;
  try {
    const deleted = await prisma.expense.deleteMany({
      where: { id: Number(id), userId: req.user.id }
    });
    if (deleted.count === 0)
      return res.status(404).json({ error: "Expense not found or not yours" });
    res.status(200).json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
}
