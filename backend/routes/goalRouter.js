import express from "express";
import passport from "passport";
import {
  createBudgetGoal,
  createSavingGoal,
  getGoals,
  deleteBudgetGoal,
  deleteSavingGoal,
  updateBudgetGoal,
  updateSavingGoal
} from "../controllers/goalController.js";

const goalRouter = express.Router();
goalRouter.use(passport.authenticate("jwt", { session: false }));

// Budget 
goalRouter.post("/budget", createBudgetGoal);
goalRouter.put("/budget/:id", updateBudgetGoal);
goalRouter.delete("/budget/:id", deleteBudgetGoal);

// Saving 
goalRouter.post("/saving", createSavingGoal);
goalRouter.put("/saving/:id", updateSavingGoal);
goalRouter.delete("/saving/:id", deleteSavingGoal);

// Get all goals
goalRouter.get("/", getGoals);

export default goalRouter;
