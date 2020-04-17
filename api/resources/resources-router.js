const express = require('express');

const Resources = require('./resources-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const resources = await Resources.getResources();
        resources
        ? res.status(200).json(resources)
        : res.status(404).json({ message: 'No Resources found' });
    } 
    catch(err) {
        res.status(500).json({ error: 'Failed to retreive resources' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const resource = await Resources.getResourceByID(req.params.id);
        const resourceProjects = await Resources.getResourceProjects(req.params.id);
        resource
        ? res.status(200).json({...resource, projects: resourceProjects})
        : res.status(404).json({ message: 'No Resource Found' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retrieve Resource' });
    }
});

router.get('/:id/projects', async (req, res) => {
    try {
        const resource = await Resources.getResourceByID(req.params.id);
        const resourceProjects = await Resources.getResourceProjects(req.params.id);
        resource
        ? res.status(200).json({projects: resourceProjects})
        : res.status(404).json({ message: 'Invalid Resource ID' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newResourceID = await Resources.addResource(req.body);
        res.status(200).json({message: `New Resource Added with id - ${newResourceID}` });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to add resource' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const resource = await Resources.getResourceByID(req.params.id);
        if (resource) {
            const record = await Resources.updateResource(req.params.id, req.body);
            res.status(200).json({ message: `${record} resource updated`});
        } else {
            res.status(404).json({ message: 'Invalid Resource ID'});
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update resource'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const resource = await Resources.getResourceByID(req.params.id);
        if (resource) {
            const record = await Resources.deleteResource(req.params.id);
            res.status(200).json({ message: `${record} resource deleted`});
        } else {
            res.status(404).json({ message: 'Invalid Resource ID'});
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete resource'});
    } 
});
module.exports = router;