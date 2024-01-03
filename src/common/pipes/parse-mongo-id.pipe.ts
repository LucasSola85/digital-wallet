import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
  
   if( !isValidObjectId(value) ) throw new Error('El Parametro no es un id de mongo valido');

    return value;
  }
}
