let bodyParser = require('body-parser');
let data = [{item: 'Get milk'}, {item: 'Kick some coding ass'}];
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/todo', (req, res) => {
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo', (req, res) => {

    });
};