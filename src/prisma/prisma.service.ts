import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: PrismaService.normalizeDatabaseUrl(
            configService.get<string>('DATABASE_URL') || '',
          ),
        },
      },
    });
  }

  /**
   * Normalizes a PostgreSQL connection string by URL-encoding the password
   * This handles special characters like &, ,, +, etc. in passwords
   */
  private static normalizeDatabaseUrl(url: string): string {
    if (!url) {
      return url;
    }

    try {
      const urlObj = new URL(url);
      const password = urlObj.password;

      if (password) {
        // URL-encode the password to handle special characters
        const encodedPassword = encodeURIComponent(password);
        urlObj.password = encodedPassword;
        return urlObj.toString();
      }

      return url;
    } catch (error) {
      // If URL parsing fails, return original URL
      console.warn('Failed to parse DATABASE_URL, using as-is:', error);
      return url;
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
