const express = require("express");
const router = express.Router();
const { class1 } = require("../controller/controller");

router.get("/", class1.a);

router.post("/", class1.b);

router.get("/Login", class1.c);
router.post("/Create", class1.d);
router.post("/Otp", class1.e);

router.post("/Add", class1.h);

router.get("/setIntervalRoute", class1.i);

router.get("/Get", class1.j);

router.get("/Amount", class1.l);
router.post("/PurchaseWinningLossCoin", class1.m);
router.post("/withdraw", class1.n);

module.exports = router;
