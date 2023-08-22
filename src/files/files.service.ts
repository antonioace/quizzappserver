import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { File } from './entity/file.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FileDto } from './dto/create-file.dto';


@Injectable()
export class FilesService {
    constructor(

        @InjectModel(File.name) private fileModel: Model<File>
    ) { }

    async create(file: FileDto): Promise<File> {
        const createdFile = new this.fileModel(file);
        return createdFile.save();
    }

    async findAll(): Promise<File[]> {
        return this.fileModel.find().exec();
    }
    async findByUserId(idUsuario: string): Promise<File[]> {
        return this.fileModel.find({ idUsuario: idUsuario }).exec();
    }
    async deleteById(id: string): Promise<File> {
        return this.fileModel.findByIdAndDelete(id);
    }




}
