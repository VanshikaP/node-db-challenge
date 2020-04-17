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

router.get('/:id/tasks', async (req, res) => {
    try {
        const project = await Projects.getProjectByID(req.params.id);
        const projectTasks = await Projects.getProjectTasks(req.params.id);
        project
        ? res.status(200).json({tasks: projectTasks})
        : res.status(404).json({ message: 'No Project Found with given ID' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retreive Project', err });
    }
});

router.get('/:id/resources', async (req, res) => {
    try {
        const project = await Projects.getProjectByID(req.params.id);
        const projectResources = await Projects.getProjectResources(req.params.id);
        project
        ? res.status(200).json({resources: projectResources})
        : res.status(404).json({ message: 'No Project Found with given ID' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retreive Project', err });
    }
})

router.post('/', async (req, res) => {
    try {
        const newProjectID = await Projects.addProject(req.body);
        res.status(200).json({ id: newProjectID });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to add Project', err });
    }
});

router.post('/:id/tasks', async (req, res) => {
    try {
        const project = await Projects.getProjectByID(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Invalid Project ID'});
        } else {
            const newTaskID = await Projects.addTask(req.params.id, req.body);
            res.status(200).json({ id: newTaskID });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to add task'})
    }
})

router.post('/:id/resources', async (req, res) => {
    try {
        const project = await Projects.getProjectByID(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Invalid Project ID'});
        } else {
            const resource = await Projects.addResource(req.params.id, req.body.resource_id);
            res.status(200).json({ message: 'Resource Added to Project' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to add resource to the Project'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const project = await Projects.getProjectByID(req.params.id);
        if (project) {
            const record = await Projects.updateProject(req.params.id, req.body);
            res.status(200).json({ message: `${record} project updated`});
        } else {
            res.status(404).json({ message: 'No Projects Found with given ID' });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to Update Project', err });
    }
});

router.put('/:id/toggleStatus', async (req, res) => {
    try {
        const project = await Projects.getProjectByID(req.params.id);
        if (project) {
            req.project = project;
            const record = await Projects.updateProject(req.params.id, {status: !req.project.status});
            res.status(200).json({ message: `${record} project status changed`});
        } else {
            res.status(404).json({ message: 'No Projects Found with given ID' });
        }
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