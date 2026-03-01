import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthReport, HealthReportDocument } from './schemas/health-report.schema';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectModel(HealthReport.name) private reportModel: Model<HealthReportDocument>,
  ) {}

  async create(data: Partial<HealthReport>): Promise<HealthReportDocument> {
    const report = new this.reportModel(data);
    return report.save();
  }

  async findByPetId(petId: string): Promise<HealthReportDocument[]> {
    return this.reportModel
      .find({ petId })
      .sort({ weekStart: -1 })
      .exec();
  }

  async findLatest(petId: string): Promise<HealthReportDocument | null> {
    return this.reportModel
      .findOne({ petId })
      .sort({ weekStart: -1 })
      .exec();
  }

  async findByWeek(
    petId: string,
    weekStart: Date,
  ): Promise<HealthReportDocument | null> {
    return this.reportModel
      .findOne({ petId, weekStart })
      .exec();
  }
}
