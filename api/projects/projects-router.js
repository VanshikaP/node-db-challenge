const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.getProjects();
        projects
        ? res.status(200).json(projects)
        : res.status(404).json({ message: 'No Projects Found' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retrieve Projects', err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.getProjectByID(req.params.id);
        const projectTasks = await Projects.getProjectTasks(req.params.id);
        const projectResources = await Projects.getProjectResources(req.params.id);
        project
        ? res.status(200).json({...project, tasks: projectTasks, resources: projectResources })
        : res.status(404).json({ message: 'No Project Found with given ID' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retreive Project', err });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProjectID = await Projects.addProject(req.body);
        res.status(200).json({ id: newProjectID });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to add Project', err });
    }
});

router.put('/:id', async (req, res) =>{
    try {
        const record = await Projects.updateProject(req.params.id, req.body);
        record
        ? res.status(200).json({ message: `${record} project updated`})
        : res.status(404).json({ message: 'No Projects Found with given ID' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Update Project', err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const record = await Projects.deleteProject(req.params.id);
        record
        ? res.status(200).json({ message: `${record} project deleted`})
        : res.status(404).json({ message: 'No Project Found with given ID' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Delete Project', err });
    }
});

module.exports = router;