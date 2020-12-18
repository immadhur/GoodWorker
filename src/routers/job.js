const express = require('express');
const jobModel = require('../models/job');
const userModel = require('../models/user');
const { successRes, failRes } = require('../utils/response');
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

const router = new express.Router();

router.get('/jobs/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const jobs = await jobModel.findById(_id);
        res.send(successRes('', jobs));
    } catch (error) {
        console.log(error);
        res.status(500).send(failRes('Failed to get jobs'));
    }
});

router.get('/jobs', async (req, res) => {
    try {
        let jobs = await jobModel.find();
        let user
        if (req.header('Authorization')){
        const token = req.header('Authorization').replace('Bearer ', '');
        const userId = jwt.verify(token, process.env.JWT_KEY);
        user = await userModel.findOne({ _id: userId.id, 'tokens.token': token });
        }
        // auth(req, res, ()=>{});
        const appliedJobs = user ? user.jobsApplied : [];
        let data = [...jobs];
        if (appliedJobs.length > 0) {
            data = jobs.filter(({ _id }) => {
                return !appliedJobs.includes(String(_id));
            });
        }
        res.send(successRes('', data));
    } catch (error) {
        console.log(error);
        res.status(500).send(failRes('Failed to get jobs'));
    }
});

module.exports = router;