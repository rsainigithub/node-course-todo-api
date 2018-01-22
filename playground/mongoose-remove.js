const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5a655b0b3e6c1a0329931840'}).then((todo)=>{

});



Todo.findByIdAndRemove('5a655b0b3e6c1a0329931840').then((todo)=>{
    console.log(todo);
});