import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Wallet } from "src/wallet/entities/wallet.entity";

@Schema()
export class Transaction extends Document {

    @Prop({
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true
    })
    walletId: Wallet;

    @Prop({
        required: true,
    })  
    amount: number;

    @Prop({
        required: true,
    })
    isCredit: boolean;

    @Prop()
    prev_balance: number;

    @Prop()
    new_balance: number;

    @Prop({
        default: '',
    })
    description: string;

    @Prop({
        default: Date.now(),
        type: Date,
    })
    createdAt: Date;

    @Prop({
        default: Date.now(),
        type: Date,
    })
    updatedAt: Date;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
