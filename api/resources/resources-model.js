const db = require('../../data/db-config.js');

function getResources() {
    return db('resources');
}

function getResourceByID(id) {
    return db('resources')
        .where({id})
        .first();
}

function getResourceProjects(id) {
    return db('project-resources')
        .where({resource_id: id});
}

function addResource(resourceData) {
    return db('resources')
        .insert(resourceData);
}

function updateResource(id, resourceData) {
    return db('resources')
        .where({id})
        .update(resourceData);
}

function deleteResource(id) {
    return db('resources')
        .where({id})
        .delete();
}

module.exports = {
    getResources,
    getResourceByID,
    getResourceProjects,
    addResource,
    updateResource,
    deleteResource
}