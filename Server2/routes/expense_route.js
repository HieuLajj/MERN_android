const express = require("express");
const router = require("express").Router();
const expenseCtrl = require("../controllers/expenseController")
const { isAuth } = require("../middlewares/validations/auth");
const expense = require("../models/expense");


router.post('/add_expense',isAuth,expenseCtrl.create);
router.get('/fetch_all',isAuth,expenseCtrl.fetch_all);
router.get('/listbyuser',isAuth,expenseCtrl.fetch_single);
router.put('/update/:id',isAuth,expenseCtrl.update);
router.delete('/delete/:id',isAuth,expenseCtrl.delete);
router.get('/expenseByCategory',isAuth,expenseCtrl.expenseByCategory);
router.get('/expenseByDay/:id',isAuth,expenseCtrl.expenseByDay);
router.get('/expenseByMonth/:id',isAuth,expenseCtrl.expenseByMonth);
router.get('/expenseDayMonth',isAuth,expenseCtrl.expenseDayVsMonth);
router.get('/expenseDayinMonth/:dayM',isAuth,expenseCtrl.expenseDayinMonth);
module.exports = router;