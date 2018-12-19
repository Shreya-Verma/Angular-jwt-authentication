const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);

app.get('/', function(req, res){
    res.send('Hello from the server');
})

app.listen(PORT, function(){
    console.log('Server running on localhost ' + PORT);
})
