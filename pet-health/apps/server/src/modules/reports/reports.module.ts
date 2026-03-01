import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { HealthReport, HealthReportSchema } from './schemas/health-report.schema';
import { ReportRepository } from './repositories/report.repository';
import { DietModule } from '../diet/diet.module';
import { WalksModule } from '../walks/walks.module';
import { VaccinesModule } from '../vaccines/vaccines.module';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HealthReport.name, schema: HealthReportSchema }]),
    DietModule,
    WalksModule,
    VaccinesModule,
    PetsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ReportRepository],
  exports: [ReportsService, ReportRepository],
})
export class ReportsModule {}
