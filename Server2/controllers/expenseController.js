const { response } = require("express");
const Expense = require("../models/expense");
const mongoose = require("mongoose");
const expenseController = {
     
    //create expense 
    create : async (req, res) => {
      console.log(req.user._id);
      const { description, title, amount } = req.body;
      try {
        const exp = await Expense.create({
          description,
          title,
          amount,
          user: req.user._id
        });
        res.json("them thanh cong")
      } catch (error) {
        res.json(error);
      }
    },

    // fetch all incone
    fetch_all: async (req,res) => {
      try {
        const exp = await Expense.find();
        res.json(exp);
      } catch (error) {
        res.json(error);
      }
    },

    //fetch single income
    fetch_single: async (req,res) => {
      console.log(req.user._id);
      var page = req.query.page;
      if(page){
        page = parseFloat(page)
        if(page < 1){page =1}
        var soLuongBoQua = (page -1) *10;
        try {
             
          let exp = await Expense.aggregate([              
              {$match: { 
                user: mongoose.Types.ObjectId(req.user._id)
              }},
              {$project: {
                created: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$created" } },
                 _id: true,
                 title: true,
                 description: true,
                 amount: true,
                 user:true,
              }},                     
            ]).skip(soLuongBoQua).limit(10)    
          res.json({success: true, exp});
        } catch (error) {
          res.json(error)
        }



      }else{
      
        try {
             
          let exp = await Expense.aggregate([              
              {$match: { 
                user: mongoose.Types.ObjectId(req.user._id)
              }},
              {$project: {
                created: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$created" } },
                 _id: true,
                 title: true,
                 description: true,
                 amount: true,
                 user:true,
              }},                     
            ])         
          res.json({success: true, exp});
        } catch (error) {
          res.json(error)
        }
      }
    },
    
    //update
    update: async (req,res) => {
      const {id} = req?.params;
      const { description, title, amount } = req.body;
      try {
        const exp = await Expense.findByIdAndUpdate(
          id,
          {
            description,
            title,
            amount,
          },
          { new: true, runValidators: true }
          )
          res.json({success: true, exp});
      } catch (error) {
        res.json(error)
      }
    }, 
    
    //delete
    delete: async (req,res) =>{
        const {id} = req?.params;
        try {
          const exp = await Expense.findByIdAndDelete(id);
          res.json({success: true, exp});
        } catch (error) {
          res.json(error);
        }
    },
    //phanloai
    expenseByCategory : async (req,res)=>{
    //  console.log(req.user._id);
        const today = new Date()
        today.setUTCHours(0,0,0,0)
  
        const tomorrow = new Date()
        tomorrow.setUTCHours(0,0,0,0)
        tomorrow.setDate(tomorrow.getDate()+1)

        const date = new Date(), y = date.getFullYear(), m = date.getMonth()
        const firstDayMonth = new Date(y, m, 1)
        const lastDayMonth = new Date(y, m + 1, 0)
        try {
           
          let exp2 = await Expense.aggregate([{
            $facet:{
              today: [
              {$match: { 
                 created: { $gte : today, $lt: tomorrow }
                ,user: mongoose.Types.ObjectId(req.user._id) 
              }},
              {$group:{
                _id:"$title",
                total: {$sum: "$amount"}
              }},
              {$sort:{
               _id:1
              }} 
              ],
              totalday:[
                {$match:{
                  created: { $gte : today, $lt: tomorrow }
                  ,user: mongoose.Types.ObjectId(req.user._id) 
                }},
                {$group:{
                  _id: today,
                  total: {$sum: "$amount"}
                }} 
              ],
              month: [
                {$match: { 
                   created: { $gte : firstDayMonth, $lt: lastDayMonth }
                  ,user: mongoose.Types.ObjectId(req.user._id) 
                }},
                {$group:{
                  _id:"$title",
                  total: {$sum: "$amount"}
                }},
                {$sort:{
                  _id:1
                }} 
              ],
              totalmonth:[
                {$match:{
                   created: { $gte : firstDayMonth, $lt: lastDayMonth }
                  ,user: mongoose.Types.ObjectId(req.user._id) 
                }},
                {$group:{
                  _id: firstDayMonth,
                  total: {$sum: "$amount"}
                }} 
              ],

            }         
          }]);
          let exp = {month: exp2[0].month,today: exp2[0].today,totalday: exp2[0].totalday[0], totalmonth: exp2[0].totalmonth[0]}
          res.json({success: true, exp});
        } catch (error) {
          res.json(error)
        }
    },

    expenseDayinMonth: async (req,res)=>{
        const {dayM} = req?.params;
      //  const dateString = "2020-05-15";
        const year = +dayM.substring(0, 4);
        const month = +dayM.substring(5, 7);
        const day = +dayM.substring(8, 10);
      
        const firstDay = new Date(year, month-1, day)
        const lastDay = new Date(year, month-1, day+1)
       
         try {
           
          let exp = await Expense.aggregate([              
              {$match: { 
                created: { $gte : firstDay, $lt: lastDay },
               // created: { $in: firstDay},
                user: mongoose.Types.ObjectId(req.user._id)
              }}, 
              {$project: {
                // dayMonthYear: { $dateToString: { format: "%d/%m/%Y", date: "$created" } },
                created: { $dateToString: { format: "%H:%M:%S", date: "$created" } },
                 //  '2022-05-16': {selected: true, marked: true, selectedColor: 'blue'},
                 _id: true,
                 title: true,
                 description: true,
                 amount: true,
                 user:true,
              }},               
            ])            
          res.json({success: true, exp});
        } catch (error) {
          res.json(error)
        }
    },

    expenseByDay : async (req,res)=>{
          const {id} = req?.params;
          const today = new Date()
          today.setUTCHours(0,0,0,0)
    
          const tomorrow = new Date()
          tomorrow.setUTCHours(0,0,0,0)
          tomorrow.setDate(tomorrow.getDate()+1)
          try {
             
            let exp = await Expense.aggregate([              
                {$match: { 
                  created: { $gte : today, $lt: tomorrow },
                  user: mongoose.Types.ObjectId(req.user._id)
                  ,title:  id
                }},
                {$project: {
                  // dayMonthYear: { $dateToString: { format: "%d/%m/%Y", date: "$created" } },
                  created: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$created" } },
                   //  '2022-05-16': {selected: true, marked: true, selectedColor: 'blue'},
                   _id: true,
                   title: true,
                   description: true,
                   amount: true,
                   user:true,
                }},                     
              ])            
            res.json({success: true, exp});
          } catch (error) {
            res.json(error)
          }
      },
    expenseByMonth : async (req,res)=>{
        const {id} = req?.params;
        const date = new Date(), y = date.getFullYear(), m = date.getMonth()
        const firstDayMonth = new Date(y, m, 1)
        const lastDayMonth = new Date(y, m + 1, 0)
        try {
           
          let exp = await Expense.aggregate([              
              {$match: { 
                created: { $gte : firstDayMonth, $lt: lastDayMonth },
                user: mongoose.Types.ObjectId(req.user._id)
                ,title:  id
              }}, 
              {$project: {
                // dayMonthYear: { $dateToString: { format: "%d/%m/%Y", date: "$created" } },
                created: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$created" } },
                 //  '2022-05-16': {selected: true, marked: true, selectedColor: 'blue'},
                 _id: true,
                 title: true,
                 description: true,
                 amount: true,
                 user:true,
              }},               
            ])            
          res.json({success: true, exp});
        } catch (error) {
          res.json(error)
        }
    },
    expenseDayVsMonth : async (req,res)=>{
      try {
           
        let exp = await Expense.aggregate([              
          {
            $match: { 
              user: mongoose.Types.ObjectId(req.user._id)
              }
          },
          {$project: {
             // dayMonthYear: { $dateToString: { format: "%d/%m/%Y", date: "$created" } },
              dayMonthYear: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
              //  '2022-05-16': {selected: true, marked: true, selectedColor: 'blue'},
              amount:true,
              user:true,
          }},
          {$group:{
            _id: "$dayMonthYear",
            total: {$sum: "$amount"}
          }}
          
        ])            
        res.json({success: true, exp});
      } catch (error) {
        res.json(error)
      }
    }
}

module.exports = expenseController;