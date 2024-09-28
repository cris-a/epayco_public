import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateUserDo {

    @IsNotEmpty()
    @IsString()
    clientDocument: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    phone: string 

}