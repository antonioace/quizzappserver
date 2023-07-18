
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRespuestaDto {
    @IsNotEmpty()
    descripcion: string;

    @IsDateString()
    fecha: string;
}
