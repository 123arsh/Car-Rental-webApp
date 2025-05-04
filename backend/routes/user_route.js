const express = require('express');
const router = express.Router();
const user = require('../models/user')

router.get('/', (req, res) => {
    console.log('Hey there');
    res.send('User route is working');
});

router.post('/signup', async (req, res)=>{
    const { firstName, lastName, phNumber, email, password } = req.body;
    const VerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const userData = await user.create({
        firstName,
        lastName,
        phNumber,
        email,
        password,
        VerificationCode
    })
    return res.json(userData);
})

router.get('/:id', async (req, res)=>{
    try{
        const userId = await user.findById(req.params.id);
        if(!userId){
            return res.status(404).send({
                message:'user not found',
            })
        }
        return res.send({
            userId: userId._id,
            userName: userId.firstName
        })
    }catch(err){
        return res.status(500).send({
            message: 'something went wront in catch',
            err
        })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: 'Please provide email and password',
        });
    }

    try {
        // Make sure the method name matches your model
        const token = await user.MatchPasswordAndGenerateToken(email, password); 

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.send({
            message: 'You are logged in...',
            token: token,
        });
    } catch (err) {
        console.error('Login error:', err); // helpful for debugging
        return res.status(401).send({
            message: 'Login failed',
            error: err.message || err,
        });
    }
});

module.exports = router;
