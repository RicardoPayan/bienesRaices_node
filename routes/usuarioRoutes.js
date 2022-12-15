import express from "express";

const router = express.Router();

router.get('/', function (req, res){
    res.send('Hola mundo en express')
})

router.post('/', function (req, res){
    res.json({msg : "tipo post"})
})

export default router;