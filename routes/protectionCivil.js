var express = require('express');
const Patient = require('../models/Patient');
var router = express.Router();
var ProtectionCivil = require('../models/ProtectionCivil');
const Emergency = require('../models/Emergency');

function sendMail(resiver , subject , text ){
    var nodemailer = require('nodemailer');
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure : true , 
      auth: {
        user: 'esiSwitch@gmail.com',
        pass: 'rhdvszlfqoeyqevg'
      }
    });
    var mailOptions = {
      from: 'esiSwitch@gmail.com',
      to: resiver,
      subject: subject,
      text: text
    };
    

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }


var rad = function(x) {
    return x * Math.PI / 180;
  };
  
  var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2[0] - p1[0]);
    var dLong = rad(p2[1] - p1[1]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1[0])) * Math.cos(rad(p2[0])) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };


router


.get('/getOne/:id',async (req,res)=>{
    try{
        const Protection = await ProtectionCivil.findById(req.params.id)
        res.status(200).json(Protection)
    }catch(err)
    {
        res.status(400).json("error in getting Protection ")
    }
    
})


.post('/add',(req,res)=>{
  try{
    const pro = new ProtectionCivil({
      location:{
        "type" : "Point",
        "coordinates" : [
          100,
          200
        ]
      },
    address:"Ain Yagout",
    email:"ka_boukef@esi.dz",
    phone:"0558684688",
    })
    pro.save() ; 
    res.status(200).json(pro)
  }
  catch(err)
  {
    res.status(400).json("error in ")
  }
})

.post('/sendMail/:id',async(req,res)=>{
try {
  let  protect =await ProtectionCivil.findById(req.params.id)
  let {location} = req.body

  sendMail(
    protect.email ,
    "Emergency Case ",
    "You have an emergency case in the follow location : "+"http://www.google.com/maps/place/"+location.coordinates[0]+","+location.coordinates[1]//+emergency.location
  )
  res.status(200).json({sucess:true,message:"the email is sent succefuly"})
  
} catch (error) {
  res.status(400).json({sucess:false,message:"the email dosn t send"})

}
  

})
.get('/getNear/:id', async (req, res) =>{
    let i = 0 ;
    //************************** */

    //********************************* */
    try{
      let emergency = await Emergency.findById(req.params.id)

       // let emergency = await emergency.find({_id:req.body._id})

        let tabProtection =await  ProtectionCivil.find({}); 
       let  tabDistance = tabProtection.map((elem)=>{
            return ({ _id:elem._id , distance:getDistance(elem.location.coordinates /*,Emergency.location*//*,point*/ ,emergency.location.coordinates ) })
        })
        tabDistance.sort(function(a, b){return a.distance - b.distance});        
        let protect = tabProtection.find((protect=>protect.id.toString()==tabDistance[0]._id.toString()))
        res.status(200).json(protect) ;
        
        /*  Send Email   */ 
       
        //mazal nditecti idha hospitale 9adr ytriti les cas wla aha 

    }catch (err)
    {
      res.status(400).json("error in getting the Near Protection") ;
    }
})


module.exports = router;