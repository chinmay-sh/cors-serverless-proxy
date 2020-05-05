'use strict';

const axios = require('axios');
const cors = require('cors');
const serverless = require('serverless-http');
const express = require('express')
var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var whitelist = ['https://github.io', 'https://the-redlord.github.io']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.get('/',async(request, response) => {
        response.send(`Welcome to Serverless CORS Proxy`);
});

// GET proxy
app.get('/proxy',async(req, res) => {
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

// POST proxy
app.post('/proxy',async(req, res) => {
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

// PUT proxy
app.put('/proxy',async(req, res) => {
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

// DELETE Proxy
app.delete('/proxy',async(req, res) => {
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



module.exports.handler = serverless(app);