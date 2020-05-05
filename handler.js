'use strict';

const axios = require('axios');
const cors = require('cors')({origin: true});
const serverless = require('serverless-http');
const express = require('express')
var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
/*
var whitelist = ['https://github.io', 'https://the-redlord.github.io/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
*/
module.exports.corsHello = serverless(app.get('/',(request, response) => {
    cors(request,response, ()=>{
        res.send(`Welcome to Serverless CORS Proxy`);
    })
  }));

// GET proxy
module.exports.corsProxyGet = serverless(app.get('/proxy',(req, res) => {
    cors(req,res, async ()=>{
        if(req.method !== 'GET') {
            return res.status(401).json({
             message: 'Not allowed'
            })
           }
        const url = req.query.url;
        var result;
        try {
            result = await axios.get(url);
        } catch (error) {
            console.error(error);
            res.status(400).send('BAD Request!');
            throw error;
        }

        res.status(200).json(result.data);
    });    
}));

// POST proxy
module.exports.corsProxyPost = serverless(app.post('/proxy',(req, res) => {
    cors(req,res, async ()=>{
        if(req.method !== 'POST') {
            return res.status(401).json({
             message: 'Wrong Method - Not allowed'
            })
           }
        const url = req.query.url;
        const data = req.body;
        console.log(data);
        var result;
        try {
            result = await axios.post(url,data,{
                headers: {'Content-type': req.header('Content-type')}
            });
        } catch (error) {
            console.error(error);
            res.status(400).send('BAD Request!');
            throw error;
        }

        res.status(200).json(result.data);
    });    
}));

// PUT proxy
module.exports.corsProxyPut = serverless(app.put('/proxy',(req, res) => {
    cors(req,res, async ()=>{
        if(req.method !== 'PUT') {
            return res.status(401).json({
             message: 'Wrong Method - Not allowed'
            })
           }
        const url = req.query.url;
        const data = req.body;
        console.log(data);
        var result;
        try {
            result = await axios.put(url,data,{
                headers: {'Content-type': req.header('Content-type')}
            });
        } catch (error) {
            console.error(error);
            res.status(400).send('BAD Request!');
            throw error;
        }

        res.status(200).json(result.data);
    });    
}));

// DELETE Proxy
module.exports.corsProxyDelete = serverless(app.delete('/proxy',(req, res) => {
    cors(req,res, async ()=>{
        if(req.method !== 'DELETE') {
            return res.status(401).json({
             message: 'Wrong Method - Not allowed'
            })
           }
        const url = req.query.url;
        const data = req.body;
        var result;
        try {
            result = await axios.delete(url,data,{
                headers: {'Content-type': req.header('Content-type')}
            });
        } catch (error) {
            console.error(error);
            res.status(400).send('BAD Request!');
            throw error;
        }

        res.status(200).json(result.data);
    });    
}));
