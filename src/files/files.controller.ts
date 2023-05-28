import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/filterFilter';
import { BadRequestException } from '@nestjs/common';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  // Sirve solo para express de fondo
  @Post("/upload")
  @UseInterceptors(FileInterceptor('filexxx', {
    fileFilter: fileFilter
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException("El archivo esta vacio")
    }
    return {
      fileName: file.originalname
    }
  }
}
