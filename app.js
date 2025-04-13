//const express = require('express');
import express from 'express'
const app = express();
//const GROQ = require('groq-sdk');
import Groq from 'groq-sdk';
const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
  });
const dotenv = require('dotenv');
const { APIClient } = require('groq-sdk/core');
dotenv.config();
const PORT = 8000;
app.use(express.json());
app.get('/test',(req,res,next)=>
{
    console.log("Get api is accessed");
    res.status(200).json({msg:'GET api is successfully accessed'});
});
app.post('/prompt',async(req,res,next)=>
{
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: req.body.prompt }],
        model: 'llama3-8b-8192',
      });
      res.status(200).json({response:chatCompletion['choices[0].message.content']});
});
app.listen(PORT,()=>
{
    console.log(`Server is up and running and listening @ ${PORT}`);
    //console.log(process.env['GROQ_API_KEY']);
});