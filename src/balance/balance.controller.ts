import { Controller, Post, Body, UsePipes,
    ValidationPipe, HttpCode, HttpStatus, Get,
    HttpException} from "@nestjs/common";
import { BalanceService } from "./balance.service";
import { RecargaDto } from "./dto/Recarga.dto";
import { BalanceDto } from "./dto/Balance.dto";

@Controller('balance')
export class BalanceController {
    constructor(public readonly balanceService: BalanceService) {}
    @Post('recarga')
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async createClient(@Body() recargaDto: RecargaDto) { 
        try {
        const response = await this.balanceService.addNewBalance(recargaDto)        
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
     
    @Post('saldo')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async loginClient(@Body() balanceDto: BalanceDto) { 
        try {
        const response = await this.balanceService.getBalance(balanceDto)        
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
