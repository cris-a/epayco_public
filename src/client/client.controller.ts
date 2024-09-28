import { Controller, Post, Body, UsePipes,
    ValidationPipe, HttpCode, HttpStatus,
    HttpException,
    Headers} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { CreateUserDo } from "./dto/Client.dto";
import { ClientService } from "./client.service";
import { LoginDto } from "./dto/Login.dto";

@Controller('clients')
export class ClientController {
    constructor(public readonly clientService: ClientService) {}
    @Post('create')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async createClient(@Body() createUserDto: CreateUserDo) { 
        try {
        const response = await this.clientService.createUser(createUserDto)        
        return {
             statusCode: HttpStatus.CREATED,
             data: response.data.data,
             message: response.data.message
         }
        } catch (error) {
         if(error instanceof HttpException) {
             throw error
         }        
         throw new HttpException('Error al comunicarse con la api', HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
     @Post('login')
     @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async loginClient(@Body() loginDto: LoginDto) { 
        try {
        const response = await this.clientService.login(loginDto)        
        return {
             statusCode: HttpStatus.CREATED,
             data: response.data.data,
             message: response.data.message
         }
        } catch (error) {
         if(error instanceof HttpException) {
             throw error
         }        
         throw new HttpException('Error al comunicarse con la api', HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
}

    

    
