import { ConflictException, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDo } from "./dto/Client.dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { LoginDto } from "./dto/Login.dto";

@Injectable()
export class ClientService {
    constructor(private readonly httpService: HttpService) {}
    public async createUser(createUserDto: CreateUserDo) {
        try {
            const response = await firstValueFrom(
                this.httpService.post('http://localhost:3000/api/v1/clients/create', createUserDto)
            )
             return {
                 statusCode: HttpStatus.CREATED,
                 message: response.data.message,
                 data: response.data
             }
            } catch (error) {                       
             if(error.response) {
                throw new HttpException({
                    status: error.response.status,
                    message: error.response.data.message,
                    error: error.response.data.error
                }, error.response.status)
             } 
            }
    }

    public async login(logindto: LoginDto) {
        try {
            const response = await firstValueFrom(
                this.httpService.post('http://localhost:3000/api/v1/clients/login', logindto)
            )
             return {
                 statusCode: HttpStatus.CREATED,
                 message: response.data.message,
                 data: response.data
             }
            } catch (error) {                       
             if(error.response) {
                throw new HttpException({
                    status: error.response.status,
                    message: error.response.data.message,
                    error: error.response.data.error
                }, error.response.status)
             } 
            }
    }
}


