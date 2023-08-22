import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, Req, Request, Get, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody, ApiConsumes, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'; // Importar decoradores de Swagger
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FilesService } from './files.service';
import { FileDto } from './dto/create-file.dto';
import { JwtAuthGuard } from 'src/usuarios/jwt-auth-guards';

@Controller('files')
@ApiTags('files') // Etiqueta para Swagger
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly cloudinaryService: CloudinaryService, private readonly fileService: FilesService) { }

  @Post('/upload')
  @ApiConsumes('multipart/form-data') // Indica que la solicitud consume datos de tipo formulario multipart
  // Hazme el api body de tipo file
  @ApiBody({
    description: 'Archivo a subir',
    type: 'file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          format: 'file',
        },
      },

    }

  })

  @ApiBadRequestResponse({ description: 'El archivo está vacío' }) // Respuesta en caso de archivo vacío
  @ApiInternalServerErrorResponse({ description: 'Error al cargar el archivo a Cloudinary' }) // Respuesta en caso de error interno
  @ApiOkResponse({ description: 'Archivo subido exitosamente', type: Object }) // Respuesta exitosa
  @UseInterceptors(FileInterceptor('filexxx')) // 'filexxx' debe coincidir con el campo del formulario en el que se espera el archivo
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
    if (!file) {
      throw new BadRequestException('El archivo está vacío');
    }

    try {
      const res = await this.cloudinaryService.uploadImage(file);
      const idUsuario = String(req.user._id);

      const fileDTO: FileDto = {
        idUsuario: idUsuario,
        url: res.secure_url,
      }
      this.fileService.create(fileDTO);
      return {
        url: res.secure_url,
        message: 'Archivo subido exitosamente',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al cargar el archivo a Cloudinary');
    }
  }

  @Get("/all")
  async findAll(@Request() req: any) {

    return this.fileService.findAll();

  }

  @Get()
  async findByUserId(@Request() req: any) {
    const idUsuario = String(req.user._id);
    return this.fileService.findByUserId(idUsuario);
  }
  @Delete("/:id")
  async deleteById(@Request() req: any) {
    const id = req.params.id;
    return this.fileService.deleteById(id);
  }

}
