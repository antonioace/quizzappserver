import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import * as dayjs from 'dayjs'
@Controller('respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) { }

  @Post()
  create(@Body() createRespuestaDto: CreateRespuestaDto) {
    console.log("CteateRespuestaDto: ", createRespuestaDto.fecha)

    const fechaString = createRespuestaDto.fecha;
    const fechaUTC = dayjs(fechaString).format('YYYY-MM-DD HH:mm:ss')

    console.log("Fechotaaaa", new Date(fechaUTC).toLocaleString());



    return this.respuestasService.create(createRespuestaDto);
  }

  @Get()
  findAll() {
    return this.respuestasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respuestasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRespuestaDto: UpdateRespuestaDto) {
    return this.respuestasService.update(+id, updateRespuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestasService.remove(+id);
  }
}
