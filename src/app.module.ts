import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { PaymentModule } from './payment/payment.module';
import { BalanceModule } from './balance/balance.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ClientModule, PaymentModule, BalanceModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
