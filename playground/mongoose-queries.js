const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a5a46522a97c59025055a6f';

if(!ObjectID.isValid(id)) {
    return console.log('ID not valid');
}

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By ID', todo);
// }).catch((e)=>{
//     console.log(e);
// });

User.findById(id).then((user)=>{
    if (!user) {
        return console.log('User not found');
    }
    console.log('UserEmail By ID', user.email);
}).catch((e)=>{
    console.log(e);
});

