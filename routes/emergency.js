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


.get('/getOne',async (req,res)=>{
    try{
        let tab = await Emergency.findOne({_id:req.body._id}).populate('patient').populate('recording')

        res.status(200).json(tab)

    }catch (err)
    {
        res.status(400).json('error in getting emergency')
    }
})


.put('/check',async(req,res)=>{
    try{
        let tab = await Emergency.updateOne({_id:req.body._id}, updateOne({_id:req.body._id} ,{$set:{checked:true}} , {upsert:true} ))
        res.status(200).json(tab)

    }catch (err)
    {
        res.status(400).json('error in getting emergency')
    }
})

module.exports = router;


