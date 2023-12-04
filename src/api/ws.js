const { getCount } = require('./controllers/countController');
const { findAllRecords } = require('./controllers/recordsController');
const { generateRecordsQuery } = require('./queries/recordsQueries');

const { REAL_TIME_RESULTS } = process.env;

const handleIoSocket = (io, db) => {
  io.on('connection', socket => { 
    socket.on('join', async () => {
      socket.join('count');

      const count = await getCount();
      const records = await findAllRecords(generateRecordsQuery({ results: REAL_TIME_RESULTS }));

      io.to('count').emit('data', { count: count.count, records });
    });

    socket.on('leave', () => socket.leave('count'));
  });

  db.models.Count.afterUpdate(async count => {
    const records = await findAllRecords(generateRecordsQuery(generateRecordsQuery({ results: REAL_TIME_RESULTS })));
    io.to('count').emit('data', { count: count.count, records });
  });
}

module.exports = {
  handleIoSocket
}
