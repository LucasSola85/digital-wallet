import { IsMongoId, IsNumber, IsString, MinLength,  } from "class-validator";

export class CreateCoinDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsNumber()
    @IsNumber()
    exchange: number;

    @IsString()
    @IsMongoId()
    currency: string;

    //TODO: crear pipe para cortar decimales.
}
