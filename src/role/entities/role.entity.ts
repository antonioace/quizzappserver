import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Role extends Document {
  @Prop()
  nombre: string;
  @Prop()
  descripcion: string;



  // Otras propiedades de tu entidad
}

export const RoleSchema = SchemaFactory.createForClass(Role);
