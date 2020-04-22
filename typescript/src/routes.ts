import { Request, Response } from "express";
import CreateUser from './services/CreateUser';
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response){
    const user = createUser({
        email: 'danieldesousa@gmail.com',
        password: '123456',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native',
            {title: 'Javascript', experience: 100}
        ]
    });

    return response.json({message: 'Hello World'});
}