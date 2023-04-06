import { Document } from "mongoose";
import { Prop, SchemaFactory ,Schema} from "@nestjs/mongoose";
@Schema()
export class User extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  celular: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  clave: string;
}

export const UserSchema = SchemaFactory.createForClass(User);