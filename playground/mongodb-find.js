//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');   //Destructuring Concept

// var obj = new ObjectID(); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5a54627bbd2fbd27d0845de9')
    //     }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err)=>{
    //     console.log('unable to fetch todos', err);
    // });
    
    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos Count ${count}`);
    // }, (err)=>{
    //     console.log('unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Sonia'}).toArray().then((docs)=>{
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=>{
        console.log('unable to fetch users', err);
    });

    // db.close();
});