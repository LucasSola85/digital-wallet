import { IsBoolean, IsMongoId, IsNumber, IsString } from "class-validator"

export class CreateTransactionDto {

    @IsString()
    @IsMongoId({message: 'La wallet no es correcta'})
    walletId: string;

    @IsNumber()
    amount: number;

    @IsBoolean()
    isCredit: boolean;

    
    prev_balance: number;

}
