const express = require("express");
const authenticateJWT = require("../middleware/authenticate");
var Messages = require('../models/Messages')

var router = express.Router();

router.get('/getrooms',authenticateJWT, async (req,res) => {
    try {
        const {role, userId} = req.user;
        let messages = await Messages.find({"room": { "$regex": userId, "$options": "i" } });
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error)
    }
})




