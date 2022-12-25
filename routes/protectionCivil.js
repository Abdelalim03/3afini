var express = require('express');
const Patient = require('../models/Patient');
var router = express.Router();
var ProtectionCivil = require('../models/ProtectionCivil')



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
   // let point =[-150,35]

    //********************************* */
    try{
       // let Recording = await Recording.find({_id:req.body._id})
        let tabProtection =await  ProtectionCivil.find(); 
       let  tabDistance = tabProtection.map((elem)=>{
            return ({ _id:elem.id , distance:getDistance(elem.location.coordinates /*,Recording.location*//*,point*/ ) })
        })
        tabDistance.sort(function(a, b){return a.distance - b.distance});
        res.status(200).json(tabDistance[0]) ;
        //mazal nditecti idha hospitale 9adr ytriti les cas wla aha 

    }catch (err)
    {
      res.status(400).json("error in getting the Near Protection") ;
    }
})


module.exports = router;