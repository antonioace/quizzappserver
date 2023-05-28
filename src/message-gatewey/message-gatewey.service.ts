import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ClientesConectados {
    [id: string]: Socket
}

@Injectable()
export class MessageGateweyService {
    private clientes: ClientesConectados = {}

    private mensajes: string[] = []

    registrarCliente(cliente: Socket) {
        this.clientes[cliente.id] = cliente
    }
    eliminarCliente(cliente: Socket) {
        delete this.clientes[cliente.id]
    }

    getClientesConectados(): string[] {
        return Object.keys(this.clientes)


    }

    getMensajes(): string[] {
        return this.mensajes
    }

    agregarMensaje(mensaje: string) {
        this.mensajes.push(mensaje)
    }
}
