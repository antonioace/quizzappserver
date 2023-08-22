import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

 export class FileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idUsuario: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;
}