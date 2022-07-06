const Task = require(".././models/Task");
const { TASK_CREATED_SUCCESSFULLY,
TASK_NOT_FOUND } = require("../constants/messages");

exports.createTask = async (req, res) => {
  
  const task = new Task(req.body);
  await task.save();
  res.status(200).json({
    message: TASK_CREATED_SUCCESSFULLY,
    task,
  });
}


// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
exports.getTasks = async (req, res) => {
  // const tasks = await Task.find();
  // res.status(200).json({
  //   tasks,
  // });
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    console.log("parts", parts);
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try{
    await req.user.populate({
      path: 'tasks',
      match ,
      options : {
        limit : parseInt(req.query.limit),
        skip : parseInt(req.query.skip),
        sort,
      }
    });
    res.json(req.user.tasks);
  } catch(e){
    console.log("e", e);
    res.status(500).send();
  }
}

exports.getTaskById = async (req, res) => {
  const _id = req.params.id
  
  // const task = await Task.findOne({ _id: _id.toString(), owner: req.user._id });
  try {
      const task = await Task.findOne({ _id, owner: req.user._id})
      
      if (!task) {
          return res.status(404).json({ message: TASK_NOT_FOUND });
      }

      res.send(task)
  } catch (e) {
      res.status(500).send()
  }
}

exports.deleteTask = async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).json({ message: TASK_NOT_FOUND });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
} 

exports.updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).json({ message: TASK_NOT_FOUND });
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
}