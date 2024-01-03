import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Coin } from "src/coin/entities/coin.entity";
import { Currency } from "src/currency/entities/currency.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { User } from "src/user/entities/user.entity";

@Schema()
export class Wallet extends Document{

    @Prop({
        required: true,
        unique: true,
        index: true
    })
    number_wallet: string;

    @Prop({
        default: 0
    })
    balance: number;

    @Prop({
        default: 0
    })
    balance_crypto: number;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Transaction.name }],
        default: null
    })
    transactions: Transaction[];

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        required: true,
        index: true
    })
    owner: User;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Currency.name,
        required: true
    })
    currency: Currency

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Coin.name,
        required: true
    })
    coin: Coin;

    @Prop({
        required: true,
        default: Date.now
    })
    created_at: Date;

    @Prop({
        required: true,
        default: Date.now
    })
    updated_at: Date;

}

export const WalletSchema = SchemaFactory.createForClass(Wallet);