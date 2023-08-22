import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { FileEschema } from './entity/file.entity';

@Module({
  /*   imports: [
      MulterModule.register({ dest: './upload' }),
    ], */
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      {
        name: 'File',
        schema: FileEschema,
      }
    ]),
  ],

  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule { }
