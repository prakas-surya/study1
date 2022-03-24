const express = require('express');

const app = express();
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors');
require('dotenv/config');

//middlewares
app.use(cors());
app.use(bodyParser.json());

//import Routes 
const postRoute = require('./routes/posts');
const sampleRoute = require('./routes/sample');

app.use('/posts', postRoute);
app.use('/sample', sampleRoute);

//Routes
app.get('/',(req,res)=> {
    res.send('we are on home');
});   



//connect to database
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true},
    ()=> console.log('connected to DB!!')
);


//server listen

app.set('port', process.env.PORT || 4200);



app.listen(app.get('port'), () => console.log('listening on port ' + app.get('port')));