import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';

@Injectable()
export abstract class Service<T extends Document, P> {
    private readonly modelName: string;

    constructor(private readonly model: Model<T>) {
        for (const modelName of Object.keys(model.collection.conn.models)) {
            if (model.collection.conn.models[modelName] === this.model) {
                this.modelName = modelName;
                break;
            }
        }
    }

    async findOne(
        conditions: Partial<Record<keyof T, unknown>>,
        projection: string | Record<string, unknown> = {},
        options: Record<string, unknown> = {},
    ): Promise<T> {
        try {
            return await this.model.findOne(
                conditions as FilterQuery<T>,
                projection,
                options,
            );
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async create(item: P): Promise<T> {

        try {
            const newItem = new this.model(item);
            return await newItem.save();
        } catch (err) {
            console.log("Error",err)
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, item: P): Promise<T> {
        try {
            const existingItem = await this.model.findByIdAndUpdate(id, item as any, { new: true });
            if (!existingItem) {
                throw new NotFoundException(`No se encontró ${this.modelName} con ID ${id}`);
            }
            return existingItem;
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }


    async remove(id: string): Promise<void> {
        try {
            const deletedItem = await this.model.findByIdAndRemove(id);
            if (!deletedItem) {
                throw new NotFoundException(`No se encontró ${this.modelName} con ID ${id}`);
            }
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
    async findAll(
        conditions: Partial<Record<keyof T, unknown>> = {},
        projection: string | Record<string, unknown> = {},
        options: Record<string, unknown> = {},
    ): Promise<T[]> {
        try {
            return await this.model.find(
                conditions as FilterQuery<T>,
                projection,
                options,
            ).exec();
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }




}
