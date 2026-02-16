import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_FILE || '/mnt/secrets/.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
