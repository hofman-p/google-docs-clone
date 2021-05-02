const mongoose = require('mongoose');
const Document = require('./Document');

const DEFAULT_VALUE = '';

const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost/google-docs-clone', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  } catch (e) {
    console.error('Problem while connecting to database', e);
  }
}

const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  socket.on('get-document', async documentId => {
    let document = null;
    try {
      document = await findOrCreateDocument(documentId);
    } catch (e) {
      console.error('Problem while finding or creating a document', e);
    }
    socket.join(documentId);
    socket.emit('load-document', document.data);
    socket.on('send-delta', delta => {
      socket.broadcast.to(documentId).emit('received-delta', delta);
    });
    socket.on('save-document', async data => {
      try {
        await Document.findByIdAndUpdate(documentId, { data });
      } catch (e) {
        console.error('Problem while saving document', e);
      }
    })
    console.log('Client connected');
  })
});

const findOrCreateDocument = async id => {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: DEFAULT_VALUE });
};

connectToDb();