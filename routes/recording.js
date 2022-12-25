var express = require('express');
var router = express.Router();
var Recording = require('../models/Recording')
const Emergency = require('../models/Emergency' ) 



const  deng =(tempurature,blodpressure,glycemie,heartbeat,fast)=>{
    let Tab=[0,0,0,0]  // case 0 for low , case 1 for medium , case 2 for high ,case 3 for normal health
    console.log(tempurature,blodpressure,glycemie,heartbeat);    

    if(37.2<tempurature && tempurature<38.2)
    {
        Tab[0]=Tab[0]+1 ; 
    }else if(38.2<=tempurature && tempurature<39.2)
    {
        Tab[1]=Tab[1]+1;
    }else if(tempurature>=39.2||tempurature<33)
    {
        Tab[2]=Tab[2]+1;
    }
    else{
        console.log("aa");    
        Tab[3]=Tab[3]+1
    }

    
    if(130<blodpressure.SYSTOLIC && blodpressure.SYSTOLIC<139 || 80<blodpressure.DIASTOLIC && blodpressure.DIASTOLIC<89 )
    {
        Tab[0]=Tab[0]+1 ; 
    }else if(140<blodpressure.SYSTOLIC && blodpressure.SYSTOLIC<180 || 90<blodpressure.DIASTOLIC && blodpressure.DIASTOLIC<120 )
    {
        Tab[1]=Tab[1]+1;
    }else if(blodpressure.SYSTOLIC>180  || blodpressure.DIASTOLIC>120 || blodpressure.SYSTOLIC<100 || blodpressure.DIASTOLIC<60 )
    {
        Tab[2]=Tab[2]+1;
    }
    else{
        Tab[3]=Tab[3]+1
    }

    
    if(70<glycemie &&glycemie<99)
    {
        Tab[0]=Tab[0]+1 ; 
    }else if(120<glycemie && glycemie<125  )
    {
        Tab[1]=Tab[1]+1;
    }else if(glycemie>125 )
    {
        Tab[2]=Tab[2]+1;
    }
    else{
        Tab[3]=Tab[3]+1
    }

    
    if(60<heartbeat &&heartbeat<100 )
    {
        Tab[3]=Tab[3]+1 ; 
    }
    else{
        Tab[0]=Tab[0]+1
    }
    
    
    let status = fast?"high":(Tab[2]?"high":(Tab[1]?"medium":(Tab[0]?"low":"good")));
    return status
}



router
.get('/getAll',(req,res,next)=>{
    Recording.find({}).then(recordings=>{
        res.status(200).json({success:true,data:recordings});
    })
    .catch(err=>next(err));
})
.post('/post',  (req, res) =>{
    try{
        console.log(req.body);
         let rec = new  Recording(req.body) ; 
         rec.save();
        let s = deng(rec.tempurature,rec.blodpressure,rec.glycemie,rec.heartbeat,rec.fast)
        if(s=="good")
        {

            res.status(200).json("you have a good health") ;  
        }
        else{
            let em = new Emergency({
                Dangerous:s,
                recording:rec._id,
                checked:false,
                fast:rec.fast,
                location:rec.location ,
                patient:rec.patient,
            })
            em.save();
            res.status(200).json("The emergency will call you") ;
        }
        
    }catch (err)
    {
      res.status(400).json("error in posting recording ") ;
    }
})





module.exports = router;