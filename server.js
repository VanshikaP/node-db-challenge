const express = require('express');
const helmet = require('helmet');

const ProjectsRouter = require('./api/projects/projects-router.js');
const TasksRouter = require('./api/tasks/tasks-router.js');
const ResourcesRouter = require('./api/resources/resources-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', ProjectsRouter);
server.use('/api/tasks', TasksRouter);
server.use('/api/resources', ResourcesRouter);

module.exports = server;