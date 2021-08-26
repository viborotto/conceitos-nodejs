const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    // TODO
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;
    const repository = { id: uuid(), title: 'Desafio Node.js', url: 'http://github.com/viborotto/conceitos-nodejs', techs: ["Node.js", "JavaScript"], likes: 0 };

    repositories.push(repository);
    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const { title, url, techs } = request.body;
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if (repositoryIndex < 0) {
        return response.status(400).json({
            error: "repository not found"
        });
    }

    const repository = {
        id,
        title,
        url,
        techs
    };
    repositories[repositoryIndex] = repository;
    return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
    // TODO
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0) {
        return response.status(400).json({
            error: "repository not found"
        });
    }

    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    // TODO
    //aumentar o numero de likes do repository specifico
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories[repositoryIndex].likes += 1;

    return response.status(201).json(repositories[repositoryIndex]);
});

module.exports = app;