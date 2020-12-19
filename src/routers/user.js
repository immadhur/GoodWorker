const express=require('express');
const model=require('../models/user');
const {successRes, failRes} = require('../utils/response');
const auth=require('../middlewares/auth');
const jobModel = require('../models/job');

const router=new express.Router();

router.post('/signup', async (req, res)=>{
    try {
        if(!req.body)
            throw new Error();
        const user = new model(req.body);
        const token=await user.GenerateToken();
        await user.save();
        res.status(201)
        .send(successRes('User added successfully!', user.GetUser(), {token}))
    } catch (error) {
        res.status(400)
        .send(failRes('Failed to add user!', error));
    }
});

router.post('/login', async (req, res)=>{
    try {
        const user=await model.login(req.body.email, req.body.password)
        const token=await user.GenerateToken();
        res.status(200)
        .send(successRes('User logged in successfully!', user.GetUser(), {token}))
    } catch (error) {
        res.status(400)
        .send(failRes('Failed to login user!', error));
    }
});

router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send(successRes('User logged out!'));
    } catch (error) {
        console.log(error);
        res.status(500).send(failRes('Failed to log user out', error));
    }
})

router.post('/apply/:id', auth, async (req, res)=>{
    try {
        const user = req.user;
        const _id=req.params.id;
        user.jobsApplied.push(_id);
        await user.save();
        res.send(successRes('Job has been applied!'));
    } catch (error) {
        console.log({error});
        res.status(400)
        .send(failRes('Failed to apply job!', error));
    }
})

router.get('/applied', auth, async (req, res)=>{
    try {
        const jobsIdList = req.user.jobsApplied;
        const jobs=await Promise.all(jobsIdList.map(async id => await jobModel.findById(id)));
        res.send(successRes('List of jobs', {jobs}));
    } catch (error) {
        console.log({error});
        res.status(400)
        .send(failRes('Failed to apply job!', error));
    }
})

module.exports=router;