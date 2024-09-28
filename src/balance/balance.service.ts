import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { RecargaDto } from "../balance/dto/Recarga.dto";
import { BalanceDto } from "./dto/Balance.dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class BalanceService {
    constructor(private readonly httpService: HttpService) {}
    public async addNewBalance(recargaDto: RecargaDto) {
        try {
            const response = await firstValueFrom(
                this.httpService.post('http://localhost:3000/api/v1/balance/recarga', recargaDto)
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

    public async getBalance(balanceDto: BalanceDto) {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`http://localhost:3000/api/v1/balance/${balanceDto.clientDocument}/${balanceDto.phone}`)
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
