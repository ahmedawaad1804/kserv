const express = require('express')
const app = express()
const cors = require('cors');
const path= require("path");
const bodyParser = require('body-parser');
const connectionDb=require('./dbConnection/mongoDbCon')

//          custom routes imports                  //
const authenticationRoute = require("./routes/authenticationRoute");


/////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(bodyParser.json());
app.use('/auth',authenticationRoute);

app.listen(3001, function () {
    console.log(' API Server for Mobile apps listening on port 3001!')
});
