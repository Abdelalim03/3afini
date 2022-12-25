var express = require("express");
var router = express.Router();
const Doctor = require('../models/Doctor');
const jwt = require("jsonwebtoken");
const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
/* GET users listing. */
router
  .get(function (req, res, next) {
    res.send("respond with a resource");
  })
  .post("/login", async function (req, res, next) {
    const { email, password, doctor } = req.body;
    if (doctor) {
      try {
        let doctor=await Doctor.findOne({email});
        if (doctor){
          const compare = await bcrypt.compare(password, doctor.password);
          
          if (!compare) {
            return res.status(404).json({success:false,message:"Invalid User or Password"});
          }
          console.log(compare);
          const token = jwt.sign(
            { userId: doctor.id, email: doctor.email },
            process.env.SECRET_KEY,
            { expiresIn: "7d" });
            doctor =await Doctor.findById(doctor.id).select('-password')
              res.status(200).json({success:true,doctor:doctor,token:token,message:"Logged in Successfully"});

          
        }else{
          res.status(404).json({success:false,message:"Invalid User or Password"})
        }
      } catch (error) {
        next(error);
      }
      

      
    } else {
      try {
        let patient=await Patient.findOne({email});
        if (patient){
          const compare = await bcrypt.compare(password, patient.password);
          
          if (!compare) {
            return res.status(404).json({success:false,message:"Invalid User or Password"});
          }
          const token = jwt.sign(
            { userId: patient.id, email: patient.email },
            process.env.SECRET_KEY,
            { expiresIn: "7d" });
            patient =await Patient.findById(patient.id).select('-password')
          res.status(200).json({success:true,patient:patient,token:token,message:"Logged in Successfully"});

          
        }else{
          res.status(404).json({success:false,message:"Invalid User or Password"})
        }
      } catch (error) {
        next(error);
      }
      
    }
  })
  .post("/signup", function (req, res, next) {
    const { firstname,email, lastname, password, birthdate, phone, doctor } =
      req.body;

      if (doctor) {
      const { specialities } = req.body;
      Doctor.find({email:email}).then(doctor=>{
        if (doctor){
          res.status(400).json({success:false,message:"Email already exists"})
        }else{
          const doctor = Doctor({
            firstname,email, lastname, password, birthdate, phone,specialities
          });
    
          doctor.save().then(doctor=>{
            const token = jwt.sign(
              { userId: doctor.id, email: doctor.email },
              process.env.SECRET_KEY,
              { expiresIn: "7d" }
            );
            Doctor.findById(doctor.id).select('-password')
                .then(doctor=>{
                  res.status(200).json({success:true,doctor:doctor,token:token,message:"Register Successfully"});
                })
            
            
          }).catch(err=>next(err));
        }
      });
      

    } else {

      const {address} =req.body;
      Patient.find({email:email}).then(patient=>{
        if (patient){
          res.status(400).json({success:false,message:"Email already exists"})
        }else{
          patient.save().then(patient=>{
            const  token = jwt.sign(
                { userId: patient.id, email: patient.email },
                process.env.SECRET_KEY,
                { expiresIn: "7d" }
              );
              Patient.findById(patient.id).select('-password')
                  .then(patient=>{
                    res.status(200).json({success:true,patient:patient,token:token,message:"Register Successfully"});
                  })
              
            }).catch(err=>next(err));
        }
      })
      const patient = Patient({
        firstname,email, lastname, password, birthdate, phone,address
      });
    }
  });


module.exports = router;
