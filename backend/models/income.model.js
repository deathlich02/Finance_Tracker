import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
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
        required: false 
    },
    recurring:{
        type: Boolean,
        required: true
    },
},
{
    timestamps: true
});

const Income = mongoose.model('Income', incomeSchema);
export default Income;