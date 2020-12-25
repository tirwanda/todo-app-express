let bodyParser = require('body-parser');
let data = [{item: 'Get milk'}, {item: 'Kick some coding ass'}];
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', (req, res) => {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};