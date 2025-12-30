import Task from "../models/Task.js";

export const createTask = async(req,res)=>{
    const task = await Task.create(
        {
            title: req.body.title,
            description: req.body.description,
            user: req.user.id
        }
    );
  res.json(task);
};

export const getTasks = async(req,res)=>{
  const tasks = await Task.find({ user:req.user.id });
  res.json(tasks);
};

export const updateTask = async (req, res) => {
    const task=await Task.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            description: req.body.description
        },
        { new: true }
    );
    res.json(task);
}

export const deleteTask = async(req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
};
