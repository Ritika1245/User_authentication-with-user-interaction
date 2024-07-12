import { Server } from 'ws';
import { chatbotQuery } from '../../controllers/chatbot';

export default async function handler(req, res) {
  if (!res.socket.server.websocketServer) {
    res.socket.server.websocketServer = new Server({ noServer: true });

    res.socket.server.websocketServer.on('connection', (ws) => {
      ws.on('message', async (message) => {
        try {
          const data = JSON.parse(message);
          await chatbotQuery(ws, data);
        } catch (e) {
          ws.send(JSON.stringify({ message: 'Error processing query', error: e.message }));
        }
      });

      ws.on('close', () => {
        console.log('Connection closed for /chatbot-query');
      });
    });
  }

  res.socket.server.websocketServer.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    res.socket.server.websocketServer.emit('connection', ws, req);
  });
  
  res.end();
}
