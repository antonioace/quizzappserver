import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuestionariosService } from './cuestionarios.service';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Cuestionarios")
@Controller('cuestionarios')
export class CuestionariosController {
  constructor(private readonly cuestionariosService: CuestionariosService) {}

  @Post()
  create(@Body() createCuestionarioDto: CreateCuestionarioDto) {
    return this.cuestionariosService.create(createCuestionarioDto);
  }

  @Get()
  findAll() {
    return this.cuestionariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuestionariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuestionarioDto: UpdateCuestionarioDto) {
    return this.cuestionariosService.update(+id, updateCuestionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuestionariosService.remove(+id);
  }
}
