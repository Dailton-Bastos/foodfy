import App from './app';

const PORT = process.env.PORT || 3333;

const server = new App().server;

server.listen(PORT);
