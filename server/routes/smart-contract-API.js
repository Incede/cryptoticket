const express = require("express");
const router = express.Router();

const logic = require("../../ethereum/logic");

router.post("/", async (req,res,next) => {
    let sellorder = await logic.sellTicket(req.body.message);
    res.send(sellorder.transactionHash);
})

router.post("/", async (req,res, next) => {
    let buyorder = await logic.buyTicket(req.body.message);
    res.send(buyorder.transactionHash);
})

module.exports = router;