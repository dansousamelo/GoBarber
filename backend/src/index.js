const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

app = express();
app.use(cors());
app.use(express.json());

/**
 * Métodos HTTP
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar alguma informação no back-end
 */

 /**
  * Tipos de Parâmetros
  * 
  * Query Params: filtros e paginação
  * Route Params: Identificar recursos (Atualizar/Deletar)
  * Request Body: Conteúdo na hora de criar ou editar algum recurso (JSON)
  */

  /**
   * Middleware
   * 
   * Interceptador de Requisições que interrompe totalmente a requisição ou ele
   * pode alterar dados da requisição 
   */
// Array que servirá como uma espécie de banco de dados
const projects = [];

function logRequests(request, response, next){
    const{ method, url } = request;
    const logLabel =`[${method.toUpperCase()}]${url}`;

    console.time(logLabel);

    next(); // Próximo

    console.timeEnd(logLabel);
}

function validateProject(request, response, next){
    const {id} = request.params;
    if(!isUuid(id)){
        return response.status(400).json({error: "Invalid project ID"})
    };
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProject); //Coloca o middleware nos caminhos /projects/:id

app.get('/projects', (request, response)=>{
    const {title} = request.query;

    const results = title
    // If ternário, filtra pelo title passado pela query
    ? projects.filter(project => project.title.includes(title))
    : projects;

    return response.json(results);
});

app.post('/projects', (request, response)=>{
    const {title, owner} = request.body;
    // Devemos colocar um ID, instalaremos a uuidv4
    // Universal Unique Universal (uuid)
    const project = {id: uuid(), title, owner };
    projects.push(project);
    // Retorna informações do objeto criado
    return response.json(project);
});

app.put('/projects/:id', (request, response)=>{
    const { id } = request.params;
    const { title, owner } = request.body;

    // Acha o index da posição do elemento passado dentro do array 
    const projectIndex = projects.findIndex(project => project.id === id);
    // Retorna um erro se não achar o index
    if(projectIndex < 0){
        return response.status(400).json({error: "Project not founded"});
    }
    // cria o elemento de novo;
    const project = {
        id,
        title,
        owner,
    };
    // coloca o elemento modificado de volta para o array
    projects[projectIndex] = project;

    return response.json(project);

});

app.delete('/projects/:id', (request, response)=>{
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);
    if(projectIndex < 0){
        return response.status(400).json({error: 'Project not found'});
    }; 

    // Remove elemnto do array;
    projects.splice(projectIndex, 1);
    return response.status(204).send();
});

app.listen(3333, ()=> {
    console.log('🚀 Back-end Started!')
});