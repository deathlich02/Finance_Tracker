import mongoose from "mongoose";

const debtSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    interest:{
        type: Number,
        required: true 
    },
    end_date:{
        type: Boolean,
        required: true
    },
},
{
    timestamps: true
});

const Debt = mongoose.model('Debt', debtSchema);
export default Debt;