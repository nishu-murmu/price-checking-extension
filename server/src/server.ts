import WebSocket, { WebSocketServer } from "ws";
import { getCompletion } from "./api/routes.js";

const websocketServer = new WebSocketServer({
  port: Number(process.env.PORT as string) || 8080,
});
websocketServer.on("connection", function (ws: WebSocket) {
  console.log("Websocket connected");
  ws.send(
    JSON.stringify({
      connected: true,
    })
  );

  ws.onmessage = async (data) => {
    const { options, shouldStream } = JSON.parse(data.data as string);
    const response = await getCompletion({
      options,
      shouldStream,
    });
    ws.send(JSON.stringify(response));
  };

  ws.onclose = () => {
    console.log("Websocket closed.");
  };
});
