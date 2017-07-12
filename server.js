var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.use('/build', express.static(__dirname + '/build'));
app.use('/src', express.static(__dirname + '/src'));

app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port);