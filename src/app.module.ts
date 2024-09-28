import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { PaymentModule } from './payment/payment.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [ClientModule, PaymentModule, BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
