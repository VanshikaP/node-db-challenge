const express = require('express');

const Tasks = require('./tasks-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.getTasks();
        tasks
        ? res.status(200).json(tasks)
        : res.status(404).json({ message: 'No Tasks Found'});
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Retrieve Tasks', err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Tasks.getTaskByID(req.params.id);
        task
        ? res.status(200).json(task)
        : res.status(404).json({ message: 'No Task Found with given ID'});
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Retrieve Task', err });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTaskID = await Tasks.addTask(req.body);
        res.status(200).json({ message: `New Task added with id - ${newTaskID}` });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Add Task', err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await Tasks.getTaskByID(req.params);
        if (task) {
            const record = await Tasks.updateTask(req.params.id, req.body);
            res.status(200).json({ message: `${record} task updated` });
        } else {
            res.status(404).json({ message: 'Invalid Task ID'});
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Update Task', err });
    }
});

router.put('/:id/toggleStatus', async (req, res) => {
    try {
        const task = await Tasks.getTaskByID(req.params.id);
        if (task) {
            req.task = task;
            const record = await Tasks.updateTask(req.params.id, {status: !req.task.status});
            res.status(200).json({ message: `${record} task status changed` });
        } else {
            res.status(404).json({ message: 'Invalid Task ID'});
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Update Task', err });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const task = await Tasks.getTaskByID(req.params);
        if (task) {
            const record = await Tasks.deleteTask(req.params.id);
            res.status(200).json({ message: `${newTaskID} task deleted` });
        } else {
            res.status(404).json({ message: 'Invalid Task ID'});
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Delete Task', err });
    }
});

module.exports = router;
