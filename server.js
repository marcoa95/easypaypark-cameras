#!/usr/bin/env node

const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/api/app');
const { configDb } = require('./src/api/db');
const { mainModelsManager } = require('./src/api/models/modelsManager');

const { HTTP_PORT } = process.env;

const main = async () => {
  try {
    const httpServer = http.createServer(app);

    const db = await configDb();
    mainModelsManager.setDatabase(db);
  
    httpServer.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));

    const io = new Server(httpServer, { cors: { origin: '*' } });

    io.on('connection', socket => { 
      socket.on('join', async () => {
        socket.join('count');

        const count = await db.models.Count.findOne({});

        io.to('count').emit('data', count.count);
      });
  
      socket.on('leave', () => socket.leave('count'));
    });

    db.models.Count.afterUpdate(count => io.to('count').emit('data', count.count));

  } catch(err) {
    console.error(err);
    throw err;
  }
}

main();
