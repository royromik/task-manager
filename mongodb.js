const mongodb = require('mongodb');
const {MongoClient, ObjectID} = mongodb;

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log("Connection to the database cannot be established");
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Romik',
    //     age: 24
    // })

    // db.collection("tasks").findOne({_id: new ObjectID("5fe61888e29b653eed99bf86")},(error, task)=>{
    //     if(error){
    //         console.log("unable to find the task")
    //     }

    //     console.log(task);
    // })

    // db.collection("tasks").find({completed: true}).toArray((error, tasks)=>{
    //     console.log(tasks);
    // })

    db.collection('tasks').insertMany([
        {
            description: 'task1',
            completed: false
        }, {
            description: 'task2',
            completed: true
        },
        {
            description: 'task3',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            console.log('document cant e inserted')
        }

        console.log(result.ops);
    })

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').deleteOne({
    //     description: 'task1'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').deleteMany({
    //     description: 'task3'
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

})