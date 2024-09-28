import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { PaymentDto } from './dto/Payment.dto';
import { ConfirmDto } from './dto/Confirm.dto';

@Injectable()
export class PaymentService {
    constructor(private readonly httpService: HttpService) {}
    public async makePayment(paymentDto: PaymentDto) {
        try {
            const response = await firstValueFrom(
                this.httpService.post('http://localhost:3000/api/v1/payments/create', paymentDto)
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

    public async confirmPayment(confirmDto: ConfirmDto, idSession: string) {        
        try {
            const response = await firstValueFrom(
                this.httpService.post('http://localhost:3000/api/v1/payments/confirm', {token: confirmDto.token}, {
                    headers: {
                        Authorization: idSession
                    }
                }
                )
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
 