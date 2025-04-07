const express = require('express');
const aiController = require("../controllers/ai.controller")

const router = express.Router();


router.post("/get-review", aiController.getReview)
router.get("/",(req,res)=>{
  res.send({message:"api is fine..."})
})


module.exports = router;    