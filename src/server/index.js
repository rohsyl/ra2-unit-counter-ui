const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, '../playerdata')));

app.get('/red', async(req, res) => {
    res.sendFile(path.join(__dirname, '../playerdata', 'red.html'));
});


app.get('/yellow', async(req, res) => {
    res.sendFile(path.join(__dirname, '../playerdata', 'yellow.html'));
});


app.get('/dashboard', async(req, res) => {
    res.sendFile(path.join(__dirname, '../playerdata', 'dashboard.html'));
});

app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
  });