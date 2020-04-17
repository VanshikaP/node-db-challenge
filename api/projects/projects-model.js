const db = require('../../data/db-config.js');

function getProjects() {
    return db('projects');
}

function getProjectByID(id) {
    return db('projects')
        .where({id})
        .first();
}

function getProjectTasks(id) {
    return db('tasks as t')
        .where('t.project_id', '=', id)
        .orderBy('t.description');
}

function getProjectResources(id) {
    return db('resources as r')
        .join('project-resources as pr', 'r.id', 'pr.resource_id')
        .select('r.id', 'r.name', 'r.description', 'pr.project_id')
        .where('pr.project_id', '=', id);
}

function addProject(projectData) {
    return db('projects')
        .insert(projectData);
}

function updateProject(id, projectData) {
    return db('projects')
        .where({id})
        .update(projectData);
}
function deleteProject(id) {
    return db('projects')
        .where({id})
        .delete();
}

module.exports = {
    getProjects,
    getProjectByID,
    getProjectTasks,
    getProjectResources,
    addProject,
    updateProject,
    deleteProject
}