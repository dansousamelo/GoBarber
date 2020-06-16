import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'danieldesousa40@hotmail.com',
    password: '1234567',
    techs: [
      'NodeJs', 
      'Python',
      'React Native',
      { title: 'Javascript', experience: 100 },
  ],
  });

  console.log(user.name);

  return response.json(user);
}
