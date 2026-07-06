import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, any>) => {
        const required = [
          'DB_HOST',
          'DB_PORT',
          'DB_USERNAME',
          'DB_PASSWORD',
          'DB_DATABASE',
          'JWT_SECRET',
          'JWT_EXPIRES_IN',
        ];

        required.forEach((key) => {
          if (!config[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
          }
        });

        const port = Number(config.DB_PORT);
        if (Number.isNaN(port) || port <= 0) {
          throw new Error('DB_PORT must be a valid positive number.');
        }

        return {
          ...config,
          DB_PORT: port,
          NODE_ENV: config.NODE_ENV || 'development',
        };
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => databaseConfig(config),
    }),

    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}