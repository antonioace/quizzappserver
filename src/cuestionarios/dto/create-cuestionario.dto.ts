import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsOptional, isString } from 'class-validator';
import { Type } from 'class-transformer';

export class OpcionDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class PreguntaDto {

  @IsString()
  @IsOptional()
  _id: string;


  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: String,
    isArray: true,
    example: ['París', 'Londres', 'Madrid', 'Roma'],
  })
  opciones: string[];
}

export class CreateCuestionarioDto {
  @IsString()
  @ApiProperty({ example: 'Cuestionario de prueba' })
  nombre: string;

  @IsString()
  @ApiProperty({ example: 'Este es un cuestionario de prueba' })
  descripcion: string;


  @IsArray()
  @ApiProperty({

    example: ['Geografía', 'Historia', 'Ciencia', 'Arte', 'Deportes', 'Entretenimiento', 'Misceláneo'],
  })
  categoria: string[];



  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  idUsuario: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PreguntaDto)
  @ApiProperty({
    type: [PreguntaDto],
    example: [
      {
        nombre: 'Pregunta 1',
        descripcion: '¿Cuál es la capital de Francia?',
        opciones: ['París', 'Londres', 'Madrid', 'Roma'],
      },
      {
        nombre: 'Pregunta 2',
        descripcion: '¿Cuál es el color del cielo?',
        opciones: ['Azul', 'Verde', 'Rojo', 'Amarillo'],
      },
    ],
  })
  preguntas: PreguntaDto[];
}
