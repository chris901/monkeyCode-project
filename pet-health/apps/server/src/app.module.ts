import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './common/config/database.module';
import { CacheConfigModule } from './common/config/cache.module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PetsModule } from './modules/pets/pets.module';
import { DietModule } from './modules/diet/diet.module';
import { VaccinesModule } from './modules/vaccines/vaccines.module';
import { WalksModule } from './modules/walks/walks.module';
import { ReportsModule } from './modules/reports/reports.module';
import { EmotionModule } from './modules/emotion/emotion.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    CacheConfigModule,
    AuthModule,
    PetsModule,
    DietModule,
    VaccinesModule,
    WalksModule,
    ReportsModule,
    EmotionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
