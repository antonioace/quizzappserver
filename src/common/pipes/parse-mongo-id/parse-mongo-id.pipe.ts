import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any) {
    const esValido = isValidObjectId(value);

    if (!esValido) {
      throw new BadRequestException('Invalid MongoDB ID');
    }

    return value;
  }
}
