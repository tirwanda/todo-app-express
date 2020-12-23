const express = require('express');
const app = express();
const todoController = require('./controllers/todoController');

//================ Set Up Template engine =============
app.set('view engine', 'ejs');


//=================== Static File =====================
app.use('/public', express.static('./public'));

//=================== Fire Controller =================
todoController(app);

//=================== Listen to port ==================
app.listen(3000);
console.log('You are listening to port 3000');