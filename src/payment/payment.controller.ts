import { Controller, Post, Body, UsePipes,
    ValidationPipe, HttpCode, HttpStatus,
    HttpException, Headers} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentDto } from "./dto/Payment.dto";
import { ConfirmDto } from "./dto/Confirm.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
    constructor(public readonly paymentService:PaymentService) {}
    @Post()
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async createClient(@Body() paymentDto:PaymentDto) { 
        try {
        const response = await this.paymentService.makePayment(paymentDto)        
        return {
             statusCode: HttpStatus.CREATED,
             data: response.data,
             message: response.data.message
         }
        } catch (error) {
         if(error instanceof HttpException) {
             throw error
         }        
         throw new HttpException('Error al comunicarse con la api', HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
    @ApiBearerAuth()
    @Post('confirm-payment')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async confirmPayment(@Body() confirmPaymentDto:ConfirmDto, @Headers('Authorization') idSession: string ) { 
        try {
        const response = await this.paymentService.confirmPayment(confirmPaymentDto, idSession)        
        return {
             statusCode: HttpStatus.CREATED,
             data: response.data,
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
