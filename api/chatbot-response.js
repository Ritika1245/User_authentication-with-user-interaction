import { Server } from 'ws';
import { chatbotOutputResponse } from '../../controllers/chatbot';

export default async function handler(req, res) {
  if (!res.socket.server.websocketServer) {
    res.socket.server.websocketServer = new Server({ noServer: true });

    res.socket.server.websocketServer.on('connection', (ws) => {
      ws.userId = req.query.userId; 

      ws.on('message', async (message) => {
        const data = JSON.parse(message);
        await chatbotOutputResponse(ws, data);
      });

      ws.on('close', () => {
        console.log('Connection closed for /chatbot-response');
      });
    });
  }

  res.socket.server.websocketServer.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    res.socket.server.websocketServer.emit('connection', ws, req);
  });
  
  res.end();
}
