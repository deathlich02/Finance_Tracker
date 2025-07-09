import prisma from '../prisma/db.js';

export const createBudgetGoal = async (req, res) => {
  try {
    const { category, targetAmount, startDate, endDate } = req.body;
    const userId = req.user.id;

    if (!category || !targetAmount || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const goal = await prisma.budgetGoal.create({
      data: {
        userId,
        category,
        targetAmount: parseFloat(targetAmount),
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });

    res.status(201).json(goal);
  } catch (err) {
    console.error("Create Budget Goal Error:", err);
    res.status(500).json({ error: "Failed to create budget goal." });
  }
};

export const createSavingGoal = async (req, res) => {
  try {
    const { name, targetAmount, deadline } = req.body;
    const userId = req.user.id;

    const goal = await prisma.savingGoal.create({
      data: {
        userId,
        name,
        targetAmount: parseFloat(targetAmount),
        deadline: new Date(deadline)
      }
    });

    res.status(201).json(goal);
  } catch (err) {
    console.error("Create Saving Goal Error:", err);
    res.status(500).json({ error: "Failed to create saving goal." });
  }
};

export const getGoals = async (req, res) => {
  try {
    const userId = req.user.id;

    const budgetGoals = await prisma.budgetGoal.findMany({ where: { userId } });
    const savingGoals = await prisma.savingGoal.findMany({ where: { userId } });

    res.status(200).json({ budgetGoals, savingGoals });
  } catch (err) {
    console.error("Fetch Goals Error:", err);
    res.status(500).json({ error: "Failed to fetch goals." });
  }
};

export const deleteBudgetGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const goal = await prisma.budgetGoal.findUnique({ where: { id: parseInt(id) } });
    if (!goal || goal.userId !== userId) {
      return res.status(403).json({ error: "Not authorized or goal not found." });
    }

    await prisma.budgetGoal.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Budget goal deleted." });
  } catch (err) {
    console.error("Delete Budget Goal Error:", err);
    res.status(500).json({ error: "Failed to delete budget goal." });
  }
};

export const updateBudgetGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, targetAmount, startDate, endDate } = req.body;
    const userId = req.user.id;

    const goal = await prisma.budgetGoal.findUnique({ where: { id: parseInt(id) } });
    if (!goal || goal.userId !== userId) {
      return res.status(403).json({ error: "Not authorized or goal not found." });
    }

    const updatedGoal = await prisma.budgetGoal.update({
      where: { id: parseInt(id) },
      data: {
        category,
        targetAmount: parseFloat(targetAmount),
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });

    res.status(200).json(updatedGoal);
  } catch (err) {
    console.error("Update Budget Goal Error:", err);
    res.status(500).json({ error: "Failed to update budget goal." });
  }
};

export const deleteSavingGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const goal = await prisma.savingGoal.findUnique({ where: { id: parseInt(id) } });
    if (!goal || goal.userId !== userId) {
      return res.status(403).json({ error: "Not authorized or goal not found." });
    }

    await prisma.savingGoal.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Saving goal deleted." });
  } catch (err) {
    console.error("Delete Saving Goal Error:", err);
    res.status(500).json({ error: "Failed to delete saving goal." });
  }
};

export const updateSavingGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, targetAmount, deadline } = req.body;
    const userId = req.user.id;

    const goal = await prisma.savingGoal.findUnique({ where: { id: parseInt(id) } });
    if (!goal || goal.userId !== userId) {
      return res.status(403).json({ error: "Not authorized or goal not found." });
    }

    const updatedGoal = await prisma.savingGoal.update({
      where: { id: parseInt(id) },
      data: {
        name,
        targetAmount: parseFloat(targetAmount),
        deadline: new Date(deadline)
      }
    });

    res.status(200).json(updatedGoal);
  } catch (err) {
    console.error("Update Saving Goal Error:", err);
    res.status(500).json({ error: "Failed to update saving goal." });
  }
};
