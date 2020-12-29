const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useUnifiedTopology: true,
  useCreateIndex: true,
});


// const Users = mongoose.model('Users',{
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     age: {
//         type : Number,
//         default: 0,
//         validate(value){
//             if(value < 0){
//                 throw new Error('age is invallid')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength:  7,
//         trim: true,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password cannot contain "password"')
//             }
//         }
//     }
// })

// const user = new Users({
//     name: '   rahul   ',
//     email: 'abc@gmail.com    ',
//     password: 'rahul1234   '
// })

// user.save().then((result)=>{
//     console.log(result);
// }).catch(error => console.log(error))

const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = new Tasks({
    
})

task.save().then(()=>{
    console.log(task)
}).catch((error)=> {
    console.log(error)
})
