var express = require('express');
var router = express.Router();
var Patient = require('../models/Patient')



router
.get('/getAll',async (req,res)=>{
  try{
    var patients =await  Patient.find({confirmed:true}) ; 
    res.status(200).json(patients) ;

}catch (err)
{
 res.status(400).json("error in getting Doctors") ;
}
})
.get('/getone/:id', async (req, res) =>{
    try{
         let patient =await  Patient.findById(req.params.id) ; 
         res.status(200).json(patient) ;

    }catch (err)
    {
      res.status(400).json("error in getting Patients") ;
    }
})


.put('/confirm/:id', async (req, res) =>{
    try{
        
         var tab =await  Patient.findByIdAndUpdate(req.params.id ,{$set:{confirmed:true}} ) ; 
         res.status(200).json(tab) ;

    }catch (err)
    {
      res.status(400).json("error in confirm Patient") ;
    }
})



module.exports = router;