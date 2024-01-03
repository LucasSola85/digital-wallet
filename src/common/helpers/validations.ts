import { BadRequestException } from "@nestjs/common";

export function validateErrors(errors: any) {
      if ( errors.code === 11000) {
        throw new BadRequestException( JSON.stringify(errors.keyPattern) + 'already exists: ' + JSON.stringify(errors.keyValue));
      }
      else {
        throw new BadRequestException(errors.message);
      }
  
}