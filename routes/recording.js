var express = require('express');
var router = express.Router();
var Recording = require('../models/Recording')
const Emergency = require('../models/Emergency' ) 



let deng =(tempurature,blodpressure,glycemie,heartbeat,fast)=>{
    let Tab=[0,0,0,0]  // case 0 for low , case 1 for medium , case 2 for high ,case 3 for normal health
    if(37.2<tempurature<38.2)
    {
        Tab[0]=Tab[0]+1 ; 
    }else if(38.2<=tempurature<39.2)
    {
        Tab[1]=Tab[1]+1;
    }else if(tempurature>=39.2||tempurature<33)
    {
        Tab[2]=Tab[2]+1;
    }
    else{
        Tab[3]=Tab[3]+1
    }


    if(130<blodpressure.SYSTOLIC<139 || 80<blodpressure.DIASTOLIC<89 )
    {
        Tab[0]=Tab[0]+1 ; 
    }else if(140<blodpressure.SYSTOLIC<180 || 90<blodpressure.DIASTOLIC<120 )
    {
        Tab[1]=Tab[1]+1;
    }else if(blodpressure.SYSTOLIC>180  || blodpressure.DIASTOLIC>120 || blodpressure.SYSTOLIC<100 || blodpressure.DIASTOLIC<60 )
    {
        Tab[2]=Tab[2]+1;
    }
    else{
        Tab[3]=Tab[3]+1
    }


    if(70<glycemie<99)
    {
        Tab[0]=Tab[0]+1 ; 
    }else if(120<glycemie<125  )
    {
        Tab[1]=Tab[1]+1;
    }else if(glycemie>125 )
    {
        Tab[2]=Tab[2]+1;
    }
    else{
        Tab[3]=Tab[3]+1
    }


    if(60<heartbeat<100 )
    {
        Tab[3]=Tab[3]+1 ; 
    }
    else{
        Tab[0]=Tab[0]+1
    }

    const max = Math.max(...Tab);
    const index = arr.indexOf(max);

    switch (index) {
        case 0:
                return "low"
            break;
        case 1:
            return "medium"
            break;
         case 2:
            return "high"
            break;
        default:
            return "good"
            break;
}
}



router

.post('/post',  (req, res) =>{
    try{
        console.log(req.body);
         let rec =new  Recording(req.body) ; 
         rec.save();
        let deng = deng(rec.tempurature,rec.blodpressure,rec.glycemie,rec.heartbeat,rec.fast)
        if(deng==good)
        {
            res.status(200).json("you have a good health") ;  
        }
        else{
            let em = new Emergency({
                Dangerous:deng(rec.tempurature,rec.blodpressure,rec.glycemie,rec.heartbeat,rec.fast),
                recording:rec._id,
                checked:false,
                fast:rec.fast,
                location:rec.location ,
                patient:rec.patient,
            })
            em.save()
            res.status(200).json("The emergency will call you") ;
        }
        
    }catch (err)
    {
      res.status(400).json("error in posting recording ") ;
    }
})





module.exports = router;