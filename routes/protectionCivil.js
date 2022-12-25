var express = require('express');
const Patient = require('../models/Patient');
var router = express.Router();
var ProtectionCivil = require('../models/ProtectionCivil')

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


.get('/getOne',async (req,res)=>{
    try{
        const Protection = await ProtectionCivil.findOne({_id:req.body._id})
        res.status(200).json(Protection)
    }catch(err)
    {
        res.status(400).json("error in getting Protection ")
    }
    
})
.get('/getNear', async (req, res) =>{
    let i = 0 ;
    
    //************************** */

    //********************************* */
    try{
        let point =[-150,35]

       // let emergency = await emergency.find({_id:req.body._id})

        let tabProtection =await  ProtectionCivil.find(); 
       let  tabDistance = tabProtection.map((elem)=>{
            return ({ _id:elem._id , distance:getDistance(elem.location.coordinates /*,Emergency.location*//*,point*/ ,point ) })
        })
        tabDistance.sort(function(a, b){return a.distance - b.distance});        
        let protect = tabProtection.find((protect=>protect.id.toString()==tabDistance[0]._id.toString()))

        console.log(protect);
        res.status(200).json(tabDistance[0]) ;
        
        /*  Send Email   */ 
        sendMail(
            protect.email ,
           //"ks_sellami@esi.dz",
            "Emergency Case ",
            "You have an emergency case in the follow location : "+"http://www.google.com/maps/place/"+point[0]+","+point[1]//+emergency.location
          )
        //mazal nditecti idha hospitale 9adr ytriti les cas wla aha 

    }catch (err)
    {
      res.status(400).json("error in getting the Near Protection") ;
    }
})


module.exports = router;