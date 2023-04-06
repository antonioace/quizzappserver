import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RespuestaModule } from './respuesta/respuesta.module';
import { CategoriasModule } from './categorias/categorias.module';
import { CuestionariosModule } from './cuestionarios/cuestionarios.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { UsuariosModule } from './usuarios/usuarios.module';

import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsuariosModule,
    CategoriasModule,
    CuestionariosModule,
    PreguntasModule,
    RespuestaModule,

    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
