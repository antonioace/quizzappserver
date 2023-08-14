import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Esquema } from 'mongoose';

@Schema()
export class Cuestionario extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  // Cambia el type por un arreglo de strings

  @Prop({ required: true, type: [String] })
  categoria: string;


  @Prop({ required: true, type: Esquema.Types.ObjectId }) // Agregar el campo idUsuario
  idUsuario: string;

  @Prop([{
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    opciones: [{ type: String, required: true }],
  }])
  preguntas: {
    _id: string;
    nombre: string;
    descripcion: string;
    opciones: string[];
  }[];
}

export const CuestionarioSchema = SchemaFactory.createForClass(Cuestionario);
