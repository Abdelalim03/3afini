var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const Hospital = require("../models/Hospital");

const bcrypt = require("bcrypt");
/* GET users listing. */
router
  .post("/login", async function (req, res, next) {
    const { email, password } = req.body;
    console.log(email,password);
    try {
      let hospital = await Hospital.findOne({ email }).select("+password");
      if (hospital) {
        const compare = await bcrypt.compare(password, hospital.password);

        if (!compare) {
          return res
            .status(404)
            .json({ success: false, message: "Invalid User or Password" });
        }
        const token = jwt.sign(
          { userId: hospital.id, email: hospital.email },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        hospital = await Hospital.findById(hospital.id).select("-password");
        res
          .status(200)
          .json({
            success: true,
            hospital: hospital,
            token: token,
            message: "Logged in Successfully",
          });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Invalid User or Password" });
      }
    } catch (error) {
      next(error);
    }
  })
  .post("/signup", function (req, res, next) {
    const { name, email, password, phone, location } = req.body;

    Hospital.findOne({ email }).then((hospital) => {
      if (hospital) {
        res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      } else {
        const hospital = Hospital({
          email,
          password,
          name,
          phone,
          location,
        });

        hospital
          .save()
          .then((doctor) => {
            const token = jwt.sign(
              { userId: doctor.id, email: doctor.email },
              process.env.SECRET_KEY,
              { expiresIn: "7d" }
            );
            Hospital.findById(hospital.id)
              .select("-password")
              .then((hospital) => {
                res
                  .status(200)
                  .json({
                    success: true,
                    hospital: hospital,
                    token: token,
                    message: "Register Successfully",
                  });
              });
          })
          .catch((err) => next(err));
      }
    });
  })
  .put("/acceptEmergency/:id", async (req, res, next) => {
    // , {upsert:true}
    try {
      const resp = await Hospital.findByIdAndUpdate(req.params.id, [
        { $set: { acceptEmrgencies: { $eq: [false, "$acceptEmrgencies"] } } },
      ]);
      if (resp)
        res
          .status(200)
          .json({ success: true, message: "Hospital changed status" });
      else
        res
          .status(404)
          .json({ success: false, message: "Hospital doesn't exist" });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

module.exports = router;
