const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
var cors = require('cors');


// read headquarters from file
const headquarters = fs.readFileSync(`${__dirname}/headquarters.json`, 'utf-8');

// read countries from API
const url = 'http://us-central1-job-interview-cfe5a.cloudfunctions.net/countries/';
const options = { headers: { 
  'Authorization': 'Basic ZGV2ZWxvcGVyOm1ldGlkZQ==',
  'Access-Control-Allow-Origin': '*' } };
let countries = '';
http.get(url, options, (res) => res.on('data', data => {
  countries += data.toString();	
}));

app.use(cors({origin: 'http://localhost:4200'}));

// create headquarters endpoint
app.get('/headquarters', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(headquarters);
});

// create countries endpoint
app.get('/countries', (req, res) => {
  res.set('Content-Type', 'application/json');  
  res.set('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(countries);
});

// launch express
app.listen(80, () => { console.log('Demo API server running on port 80') });

