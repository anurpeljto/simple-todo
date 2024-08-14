const Task = require('../model/task');
const asyncWrapper = require('../middleware/async');
const {createNewCustomError} = require('../errors/custom-error');

class TaskController {
    getTasks = asyncWrapper(async (req, res) => {
        const results = await Task.find({});
        return res.status(200).json({success: true, tasks: results, amount: results.length})
    });

    createTask = asyncWrapper(async(req,res) => {
        const newTask = await Task.create(req.body);
        return res.status(201).json({success: true, task: newTask})
    });

    // individual task

    getTask = asyncWrapper(async(req,res, next) => {
        const {id} = req.params;
            const task = await Task.findOne({_id: id});

            if(!task){
                return next(createNewCustomError(`No task with id: ${id}`, 404))
            }
            return res.status(200).json({success: true, task: task});
    });

    deleteTask = asyncWrapper(async(req, res) => {
        const {id} = req.params;
            const task = await Task.findOneAndDelete({_id: id});

            if(!task){
                return next(createNewCustomError(`No task with id: ${id}`, 404))
            }

            return res.status(200).json({success: true, task: task})
    });

    patchTask = asyncWrapper(async(req, res) => {
        const {id} = req.params;
            const task = await Task.findOneAndUpdate({_id: id}, req.body, {
                runValidators: true,
                new: true
            });

            if(!task){
                return next(createNewCustomError(`No task with id: ${id}`, 404))
            }

            return res.status(200).json({success: true, task: task})
    })
}

module.exports = TaskController;