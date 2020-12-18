const express=require('express');
const bodyparser=require('body-parser');
require('./db/mongoose');
const path = require("path");

const userRouter=require('./routers/user');
const jobRouter=require('./routers/job');

const app=express();
app.use(bodyparser.json());
app.use(userRouter);
app.use(jobRouter);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

module.exports=app;
