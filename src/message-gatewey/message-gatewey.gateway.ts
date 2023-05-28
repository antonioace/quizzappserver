import { SubscribeMessage } from '@nestjs/websockets';
import { MessageGateweyService } from './message-gatewey.service';
import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateweyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer() webSocketServer: Server;
  constructor(private readonly messageGateweyService: MessageGateweyService) { }
  handleConnection(client: Socket, ...args: any[]) {
    console.log("Socket conectadoo", client.id)


    if (this.messageGateweyService.getClientesConectados().length < 2) {
      this.messageGateweyService.registrarCliente(client)

      this.webSocketServer.emit('nuevo-cliente', this.messageGateweyService.getClientesConectados())
      this.webSocketServer.emit('mensajes', this.messageGateweyService.getMensajes())

    } else {
      console.log("Solo se pueden conectador dos personas")
    }
    /*     throw new Error('Method not implemented.'); */
  }
  handleDisconnect(client: Socket) {
    console.log("Socket desconectado", client.id)
    this.messageGateweyService.eliminarCliente(client)
    this.webSocketServer.emit('nuevo-cliente', this.messageGateweyService.getClientesConectados())
    /*     throw new Error('Method not implemented.'); */
  }
  afterInit(server: any) {
    /*   throw new Error('Method not implemented.'); */
  }

  @SubscribeMessage('mensaje')
  handleMessage(client: Socket, payload: string): void {
    console.log("mensaje recibido", payload)
    this.messageGateweyService.agregarMensaje(payload)
    this.webSocketServer.emit('mensajes', this.messageGateweyService.getMensajes())

    /*     this.webSocketServer.emit('mensaje-nuevo', payload) */
    /*     return 'Hello world!'; */
  }
}
