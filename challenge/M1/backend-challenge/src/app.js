const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

const app = express();

function validateLikes(request, response, next){
  const {likes} = request.body;
  if(likes || (likes == 0)){
    return response.status(400).json({error: "You cannot set the number of likes"});
  };
  return next();
}

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", validateLikes, (request, response) => {
  const {id, title, url, techs} = request.body;
  const likes = 0;
  if(id || id ==0)
  return response.status(400).json({error: "You cannot set ID"});

  const repositorie = {id: uuid(), title, url, techs, likes}
  
  repositories.push(repositorie);
  return response.status(201).json(repositorie)

});

app.put("/repositories/:id", validateLikes, (request, response) => {
  const { id } = request.params;
  var {title, url, techs} = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id); 
  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not founded!"});
  }
  likes = repositories[repositorieIndex].likes;
  
  if(title === undefined)
    title = repositories[repositorieIndex].title;
  
  if(url === undefined)
    url = repositories[repositorieIndex].url;

  if(techs === undefined)
    techs = repositories[repositorieIndex].techs;

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if(repositorieIndex < 0){
    return response.status(400).json({erro: "Repositorie not founded!"});
  };

  repositories.splice(repositorieIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({error: "Invalid project ID"})
  };

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not founded!"});
  };

  repositories[repositorieIndex].likes += 1;
  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
