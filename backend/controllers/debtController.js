import prisma from "../prisma/db.js";

export async function getDebts(req, res) {
  try {
    const debts = await prisma.debt.findMany({
      where: { userId: req.user.id }
    });
    res.status(200).json(debts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch debts" });
  }
}

export async function getDebt(req, res) {
  const { id } = req.params;
  try {
    const debt = await prisma.debt.findFirst({
      where: { id: Number(id), userId: req.user.id }
    });
    if (!debt) return res.status(404).json({ error: "Debt not found" });
    res.status(200).json(debt);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch debt" });
  }
}

export async function addDebt(req, res) {
  const { name, total, dueDate } = req.body;
  try {
    const debt = await prisma.debt.create({
      data: {
        name,
        total: parseFloat(total),
        dueDate: new Date(dueDate),
        userId: req.user.id
      }
    });
    res.status(201).json(debt);
  } catch (err) {
    console.error("Error creating debt:", err);
    res.status(500).json({ error: "Failed to create debt" });
  }
}

export async function updateDebt(req, res) {
  const { id } = req.params;
  const { name, total, dueDate } = req.body;
  try {
    const updated = await prisma.debt.updateMany({
      where: { id: Number(id), userId: req.user.id },
      data: {
        name,
        total: parseFloat(total),
        dueDate: new Date(dueDate)
      }
    });
    if (updated.count === 0)
      return res.status(404).json({ error: "Debt not found or not yours" });
    res.status(200).json({ message: "Debt updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update debt" });
  }
}

export async function deleteDebt(req, res) {
  const { id } = req.params;
  try {
    const deleted = await prisma.debt.deleteMany({
      where: { id: Number(id), userId: req.user.id }
    });
    if (deleted.count === 0)
      return res.status(404).json({ error: "Debt not found or not yours" });
    res.status(200).json({ message: "Debt deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete debt" });
  }
}
