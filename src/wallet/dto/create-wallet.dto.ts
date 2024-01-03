import { IsMongoId, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateWalletDto {

    @IsString()
    @MinLength(10)
    number_wallet: string;

    @IsString()
    @IsMongoId()
    owner: string;

    @IsString()
    @IsMongoId()
    currency: string;

    @IsString()
    @IsMongoId()
    coin: string;

    transaction: string[];

}
