var express = require('express');
var router = express.Router();
var Doctor = require('../models/Doctor')

router

.get('/getAll',async (req,res)=>{
  try{
    var doctors =await  Doctor.find({confirmed:true}) ; 
    res.status(200).json(doctors) ;

}catch (err)
{
 res.status(400).json("error in getting Doctors") ;
}
})
.get('/getone/:id', async (req, res) =>{
  try{
       var doctor =await  Doctor.findById(req.params.id) ; 
       res.status(200).json(doctor) ;

  }catch (err)
  {
    res.status(400).json("error in getting Doctors") ;
  }
})




.put('/confirm/:id', async (req, res) =>{
    try{
        console.log(req.params.id);
         var tab =await  Doctor.findByIdAndUpdate(req.params.id ,{$set:{confirmed:true}}) ; 
         res.status(200).json(tab) ;

    }catch (err)
    {
      res.status(400).json("error in confirm Doctor") ;
    }
})





module.exports = router;