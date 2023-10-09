import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;


    @IsNotEmpty()
    @IsString()
    descripcion: string;
}
