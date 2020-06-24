const express = require('express')
const app = express()
const bodyParser = require('body-parser');



app.use(bodyParser.json());


app.listen(3000, function () {
    console.log(' API Server for admin  listening on port 3000!')
});
