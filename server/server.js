require('./config/config.js');

const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

//**********************************************/
//**************POST - /todos*******************/
//**********************************************/

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        res.status(400).send(e);
    })
});

//**********************************************/
//**************POST - /users*******************/
//**********************************************/

app.post('/users', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']); 
    var user = new User(body);

    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});



//**********************************************/
//**************GET - /users/me*****************/
//**********************************************/

app.get('/users/me', authenticate, (req, res)=>{

    // var token = req.header('x-auth');

    // User.findByToken(token).then((user)=>{
    //     if(!user){
    //         return Promise.reject();
    //     }
    //     res.send(user);
    // }).catch((e)=>{
    //     res.status(401).send();
    // });
    
    res.send(req.user);
});

//**********************************************/
//**************GET - /todos********************/
//**********************************************/
app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send(e);
    });
})

//**********************************************/
//**************GET - /todos/:id****************/
//**********************************************/
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID value');
    }

    Todo.findById(id).then((todo)=>{
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo: todo, status: 200});
    }, (e)=>{
        res.status(400).send();
    });

})

//**********************************************/
//**************DELETE - /todos/:id*************/
//**********************************************/
app.delete('/todos/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID value');
    }

    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

//**********************************************/
//**************UPDATE - /todos/:id*************/
//**********************************************/
app.patch('/todos/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID value');
    }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })

});

app.listen(3000, ()=>{
    console.log('Started on Port 3000');
})


module.exports = {app};