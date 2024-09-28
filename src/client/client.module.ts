import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [ClientService],
  controllers: [ClientController]
})
export class ClientModule {}
