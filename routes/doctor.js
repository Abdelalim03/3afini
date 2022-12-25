var express = require('express');
var router = express.Router();
var Doctor = require('../models/Doctor')

router


.get('/getone', async (req, res) =>{
  try{
       var tab =await  Doctor.find({_id:req.body._id}) ; 
       res.status(200).json(tab) ;

  }catch (err)
  {
    res.status(400).json("error in getting Patients") ;
  }
})




.put('/confirm', async (req, res) =>{
    try{
         var tab =await  Doctor.updateOne({_id:req.body._id} ,{$set:{confirm:true}} , {upsert:true} ) ; 
         res.status(200).json(tab) ;

    }catch (err)
    {
      res.status(400).json("error in confirm Patient") ;
    }
})



.get('/nonConfirm', async (req, res) =>{
  try{
       var tab =await  Doctor.find({confirm:false}) ; 
       res.status(200).json(tab) ;

  }catch (err)
  {
    res.status(400).json("error in getting Patients") ;
  }
});

module.exports = router;