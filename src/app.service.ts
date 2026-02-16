import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    const file = process.env.HELLO_FILE || '/mnt/secrets/env';
    try {
      return fs.readFileSync(file, 'utf8').trim();
    } catch {
      return 'PRIVATE';
    }
  }
}
