import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Esquema } from 'mongoose';

@Schema()
export class File extends Document {


    @Prop({ required: true, type: Esquema.Types.ObjectId }) // Agregar el campo idUsuario
    idUsuario: string;

    @Prop({ required: true })
    url: string;


}

export const FileEschema = SchemaFactory.createForClass(File);
