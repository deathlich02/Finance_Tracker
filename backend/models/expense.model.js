import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true 
    },
    recurring:{
        type: Boolean,
        required: true
    },
},
{
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;