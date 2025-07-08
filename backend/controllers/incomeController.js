import prisma from "../prisma/db.js";

export async function getIncomes(req, res) {
  try {
    const incomes = await prisma.income.findMany({
      where: { userId: req.user.id }
    });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch incomes" });
  }
}

export async function getIncome(req, res) {
  const { id } = req.params;
  try {
    const income = await prisma.income.findFirst({
      where: { id: Number(id), userId: req.user.id }
    });
    if (!income) return res.status(404).json({ error: "Income not found" });
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch income" });
  }
}

export async function addIncome(req, res) {
  const { name, amount, date } = req.body;
  try {
    const income = await prisma.income.create({
      data: {
        name,
        amount: parseFloat(amount),
        date: date ? new Date(date) : undefined,
        userId: req.user.id
      }
    });
    res.status(201).json(income);
  } catch (err) {
    console.error("Error creating income:", err);
    res.status(500).json({ error: "Failed to create income" });
  }
}

export async function updateIncome(req, res) {
  const { id } = req.params;
  const { name, amount, date } = req.body;
  try {
    const updated = await prisma.income.updateMany({
      where: { id: Number(id), userId: req.user.id },
      data: {
        name,
        amount: parseFloat(amount),
        ...(date && { date: new Date(date) })
      }
    });
    if (updated.count === 0)
      return res.status(404).json({ error: "Income not found or not yours" });
    res.status(200).json({ message: "Income updated" });
  } catch (err) {
    console.error("Error updating income:", err);
    res.status(500).json({ error: "Failed to update income" });
  }
}

export async function deleteIncome(req, res) {
  const { id } = req.params;
  try {
    const deleted = await prisma.income.deleteMany({
      where: { id: Number(id), userId: req.user.id }
    });
    if (deleted.count === 0)
      return res.status(404).json({ error: "Income not found or not yours" });
    res.status(200).json({ message: "Income deleted" });
  } catch (err) {
    console.error("Error deleting income:", err);
    res.status(500).json({ error: "Failed to delete income" });
  }
}
