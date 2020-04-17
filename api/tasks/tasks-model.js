const db = require('../../data/db-config.js');

function getTasks() {
    return db('tasks');
}

function getTaskByID(id) {
    return db('tasks')
        .where({id})
        .first();
}


function addTask(taskData) {
    return db('tasks')
        .insert(taskData);
}

function updateTask(id, taskData) {
    return db('tasks')
        .where({id})
        .update(taskData);
}

function deleteTask(id) {
    return db('tasks')
        .where({id})
        .delete();
}

module.exports = {
    getTasks,
    getTaskByID,
    addTask,
    updateTask,
    deleteTask
}