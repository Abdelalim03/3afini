var express = require('express');
var router = express.Router();
const Emergency = require('../models/Emergency' ) 


router





.get('/getNotChecked', async (req, res)=> {
    try{
        let tab = await Emergency.find({checked:false}).populate('patient').populate('recording')
        res.status(200).json(tab)

    }catch(err){
        res.status(400).json("error in getting emergencies")
    }
})


.get('/getOne/:id',async (req,res)=>{
    try{
        let tab = await Emergency.findOne({_id:req.params.id}).populate('patient').populate('recording')

        res.status(200).json(tab)

    }catch (err)
    {
        res.status(400).json('error in getting emergency')
    }
})


.put('/check/:id',async(req,res)=>{
    try{
        let emergency = await Emergency.findByIdAndUpdate(req.params.id, {$set:{checked:true}})
        res.status(200).json({success:true,message:"emergency is checked"})

    }catch (err)
    {
        res.status(400).json('error in getting emergency')
    }
})

module.exports = router;


