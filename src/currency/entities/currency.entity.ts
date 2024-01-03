import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class Currency extends Document{


    @Prop({
        required: true,
        unique: true,
        index: true,
    })
    currency: string;

    @Prop({
        required: true,
    })
    symbol: string;

    @Prop({
        default: 1
    })
    rate: number;

    @Prop({
        default: true
    })
    status: boolean;

    @Prop({
        default: Date.now,
        type: Date
    })
    createdAt: Date;

    @Prop({
        default: Date.now,
        type: Date
    })
    updatedAt: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
