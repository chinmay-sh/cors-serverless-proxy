'use strict';

const axios = require('axios');
const cors = require('cors')({ origin: true });
const serverless = require('serverless-http');
const express = require('express')
const app = express()


module.exports.corsHello = serverless(app.get('/',(request, response) => {
    cors(request,response, ()=>{
        response.send("Hello from a Severless Cors Proxy!");
    })
  }));


module.exports.corsProxyGet = serverless(app.get('/proxy',(req, res) => {
    cors(req,res, async ()=>{
        if(req.method !== 'GET') {
            return res.status(401).json({
             message: 'Not allowed'
            })
           }
        const url = req.query.url;
        //const data = req.body;
        //console.log(data);
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
/*
module.exports.corsProxyPost = serverless(app.get('/proxy',(req, res) => {
    cors(req,res, async ()=>{
        if(req.method !== 'GET') {
            return res.status(401).json({
             message: 'Not allowed'
            })
           }
        const url = req.query.url;
        //const data = req.body;
        //console.log(data);
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
*/