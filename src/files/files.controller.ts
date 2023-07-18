import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Req, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/filterFilter';
import { BadRequestException } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService, private readonly cloudinaryService: CloudinaryService) { }

  // Sirve solo para express de fondo
  @Post("/upload")
  @UseInterceptors(FileInterceptor('filexxx', {
    fileFilter: fileFilter
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException("El archivo esta vacio")
    }

    try {
      const res = await this.cloudinaryService.uploadImage(file)
      return {
        url: res.secure_url,
        message: "Archivo subido exitosamente"
      }

    } catch (error) {
      throw new InternalServerErrorException("Error al cargar el archivo a Cloudinary");


    }



  }
}
