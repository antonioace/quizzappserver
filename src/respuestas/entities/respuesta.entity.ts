import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Respuesta extends Document {
    @Prop({ required: true })
    descripcion: string;

    @Prop({ required: true, default: Date.now })
    fecha: Date;
}

export const RespuestaSchema = SchemaFactory.createForClass(Respuesta);
