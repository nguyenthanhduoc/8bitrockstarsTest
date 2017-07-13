const express = require('express');
const app = express();
const port = 8080;

app.use('/build', express.static(__dirname + '/build'));
app.use('/src', express.static(__dirname + '/src'));

app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port);