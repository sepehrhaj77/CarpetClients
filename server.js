const express = require('express');
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()  
}

const port = process.env.PORT || 3000;

//connect to database
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res =>{
        console.log("DB Connected")})
    .catch(err => {
        console.error(err)
    })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('connected to database'))

//Sets handlebars configurations
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
}));

//connect to html css files
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json()) //allow server to accept json as a body instead of just POST or GET etc.
app.use(bodyParser.urlencoded({ extended: false })); //allow server to receive form data

//connect to router files
const apiRouter = require('./routes/apiRouter') 
const viewsRouter = require('./routes/viewsRouter')
app.use('/', viewsRouter)
app.use('/api', apiRouter)

app.listen(port, ()=> console.log('Server started'))