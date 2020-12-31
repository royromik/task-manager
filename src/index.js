const express = require("express");
require("./db/mongoose.js");
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.port || 3000;


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up to the port ${port}`);
});


// const Tasks = require('./models/task');
// const Users = require('./models/user');

// const main = async ()=>{
//   // const task = await Tasks.findById('5feded0a9288195899d4adaa');
//   // await task.populate("owner").execPopulate()
//   // console.log(task.owner);
//   const user = await Users.findById('5fedbfc7ad96544c99c42cd4');
//   await user.populate("tasks").execPopulate()
//   console.log(user.tasks);
// }

// main()