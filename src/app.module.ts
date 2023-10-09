import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RespuestaModule } from './respuesta/respuesta.module';

/*
import { PreguntasModule } from './preguntas/preguntas.module'; */

import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { CuestionariosModule } from './cuestionarios/cuestionarios.module';
import { FilesModule } from './files/files.module';

import { MessageGateweyModule } from './message-gatewey/message-gatewey.module';
import { CommonModule } from './common/common.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { ServicegenericModule } from './servicegeneric/servicegeneric.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UsuariosModule,
    RespuestaModule,
    CategoriasModule,
    CuestionariosModule,

    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGO_URI),
    FilesModule,
    MessageGateweyModule,
    CommonModule,
    CloudinaryModule,
    RespuestasModule,
    ServicegenericModule,
    RoleModule,
  ],
  exports: [ServicegenericModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
