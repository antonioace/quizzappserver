import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,

} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth-guards';
import { JwtAuthGuard } from './jwt-auth-guards';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/usuario.entity';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
/* import { JwtAuthGuard } from './jwt-auth-guards'; */


@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @ApiResponse({
    status: 201,
    description: 'El usuario fue creado exitosamente.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Hubo un error y no se pudo crear el usuario.',
  })
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto, @Req() req) {

    return this.usuariosService.login(req.user);
  }

  @Get("/checktoken")
  checkToken(@Req() req) {

    return this.usuariosService.checkToken(req.headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {

    return this.usuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {

    const idUsuario = req.user._id;


    return this.usuariosService.findOne(idUsuario);
  }


  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {


    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
