import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.PORT ?? 'YA OL DA';
  }
}
