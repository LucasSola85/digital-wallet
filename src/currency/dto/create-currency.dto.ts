import { IsEnum, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

enum TypeCurrency {
    USD = 'USD',
    EURO = 'EURO',
}

export class CreateCurrencyDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsEnum(TypeCurrency, { message: 'El tipo de moneda solo puede ser USD o EURO' })
    currency: TypeCurrency;
    
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9\s\-_@#$%^€&*()]+$/, {
        message: 'La propiedad solo puede contener letras, números y caracteres especiales: -_@#$%^€&*()',
    })
    symbol: string;

}
