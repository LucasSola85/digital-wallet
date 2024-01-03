import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Currency } from "src/currency/entities/currency.entity";


@Schema()
export class Coin {

    @Prop({
        required: true,
        index: true,
    })
    name: string;

    @Prop({
        required: true
    })
    exchange: number;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Currency.name,
        required: true,
        unique: true
    })
    currency: Currency; 

    @Prop({
        default: true
    })
    status: boolean;

    @Prop({
        default: Date.now,
        type: Date
    })
    createAt: Date;

    @Prop({
        default: Date.now,
        type: Date
    })
    updatedAt: Date;


}

export const CoinSchema = SchemaFactory.createForClass(Coin);