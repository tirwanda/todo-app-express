const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to Database
mongoose.connect('mongodb+srv://test:test@cluster0.jtm9y.mongodb.net/todoApp?retryWrites=true&w=majority');

// Creat a schema - this is like a blueprint
let todoSchema = new mongoose.Schema({
    item: String
});
const Todo = mongoose.model('Todo', todoSchema);

//let data = [{item: 'Get milk'}, {item: 'Kick some coding ass'}];
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/todo', (req, res) => {
        //Get data from mongodb and pass it to view
        Todo.find({}, (err, data) => {
            if(err) throw err;
            res.render('todo', {todos: data});
        });
        // res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //Get data from the view and add it to mongodb
        let newTodo = Todo(req.body).save((err, data) => {
            if(err) throw err;
            res.json(data);
        });
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', (req, res) => {
        //Delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if(err) throw err;
            res.json(data);
        });
        // data = data.filter(function(todo) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
};