import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ message: 'Welcome to api-vendas!' });
});

export default routes;
