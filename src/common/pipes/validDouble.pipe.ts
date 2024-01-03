import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidDecimalPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const decimalPart = (value.exchange.toString().split('.')[1] || '').length;

    if (decimalPart > 5) {
      throw new BadRequestException('El numero de decimales no puede ser mayor a 5');
    }

    return value;


  }
}