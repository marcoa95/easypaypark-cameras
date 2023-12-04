#!/usr/bin/env node

const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/api/app');
const { configDb } = require('./src/api/db');
const { handleIoSocket } = require('./src/api/ws');
const { mainModelsManager } = require('./src/api/models/modelsManager');
const HBS = require('./src/api/hbs');

const { HTTP_PORT } = process.env;

const main = async () => {
  try {
    const httpServer = http.createServer(app);

    const db = await configDb();
    mainModelsManager.setDatabase(db);
  
    httpServer.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));

    const io = new Server(httpServer, { cors: { origin: '*' } });

    handleIoSocket(io, db);

    await HBS.initHbs();

  } catch(err) {
    console.error(err);
    throw err;
  }
}

main();
