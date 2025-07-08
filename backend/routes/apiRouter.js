import { Router } from "express";
import { getExpense, getExpenses, deleteExpense, updateExpense, addExpense } from "../controllers/expenseController.js";
import { getDebt, getDebts, deleteDebt, updateDebt, addDebt } from "../controllers/debtController.js";
import { getIncome, getIncomes, deleteIncome, updateIncome, addIncome } from "../controllers/incomeController.js";
import passport from "passport";

const apiRouter = Router()
apiRouter.use(passport.authenticate("jwt", {session: false}))

//expenses
apiRouter.get('/expenses', getExpenses)
apiRouter.get('/expenses/:id', getExpense)
apiRouter.post('/expenses', addExpense)
apiRouter.put('/expenses/:id', updateExpense)
apiRouter.delete('/expenses/:id', deleteExpense)

//debts
apiRouter.get('/debts', getDebts)
apiRouter.get('/debts/:id', getDebt)
apiRouter.post('/debts', addDebt)
apiRouter.put('/debts/:id', updateDebt)
apiRouter.delete('/debts/:id', deleteDebt)

//incomes
apiRouter.get('/incomes', getIncomes)
apiRouter.get('/incomes/:id', getIncome)
apiRouter.post('/incomes', addIncome)
apiRouter.put('/incomes/:id', updateIncome)
apiRouter.delete('/incomes/:id', deleteIncome)

export default apiRouter