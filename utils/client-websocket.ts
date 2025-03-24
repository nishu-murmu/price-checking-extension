export class ClientSocket {
  private url: string;
  CONNECTED: boolean = false;
  ws: WebSocket | null = null;
  messageHandler: ((data: any) => void) | null = null;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  connect() {
    if (!this.CONNECTED) {
      const ws = new WebSocket(this.url);
      this.ws = ws;
      this.CONNECTED = true;
      this.ws.onopen = () => {
        console.log("Websocket connected.");
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (this.messageHandler) {
          this?.messageHandler(data);
        }
      };
    }

    if (!this.ws) {
      return false;
    }

    this.ws.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket closed.");
      this.ws = null;
    };
  }

  sendMessage(data: any) {
    if (!this.ws?.CONNECTING) {
      this.ws!.send(data);
    }
  }

  setOnMessageHandler(handler: (data: any) => void) {
    this.messageHandler = handler;
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
