let mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB = 'mongodb://127.0.0.1:27017/BeeDb';
mongoose.connect(mongoDB, { useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
    console.log(' Database connected')
});


