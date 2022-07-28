const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,  
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       require: true
    },
});

module.exports = mongoose.model('Expense',ExpenseSchema)