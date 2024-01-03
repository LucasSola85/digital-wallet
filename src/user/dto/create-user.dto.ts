import { IsEmail, IsString, MinLength } from "class-validator";



export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    lastname: string;

    @IsString()
    @IsEmail({}, { message: 'El correo no es correcto'})
    email: string;
}
