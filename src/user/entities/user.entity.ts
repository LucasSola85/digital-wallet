import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({
        required: true,
        minlength: 3,
    })
    name: string;

    @Prop({
        required: true,
        minlength: 3,
    })
    lastname: string;

    @Prop({
        required: true,
        unique: true,
        index: true,
    })
    email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
