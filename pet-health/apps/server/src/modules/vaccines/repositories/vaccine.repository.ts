import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VaccineRecord, VaccineRecordDocument } from './schemas/vaccine-record.schema';

@Injectable()
export class VaccineRepository {
  constructor(
    @InjectModel(VaccineRecord.name) private vaccineModel: Model<VaccineRecordDocument>,
  ) {}

  async create(data: Partial<VaccineRecord>): Promise<VaccineRecordDocument> {
    const record = new this.vaccineModel(data);
    return record.save();
  }

  async findByPetId(petId: string): Promise<VaccineRecordDocument[]> {
    return this.vaccineModel.find({ petId }).sort({ inoculationDate: -1 }).exec();
  }

  async findById(id: string): Promise<VaccineRecordDocument | null> {
    return this.vaccineModel.findById(id).exec();
  }

  async findUpcomingAlerts(petId: string, days: number = 30): Promise<VaccineRecordDocument[]> {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return this.vaccineModel
      .find({
        petId,
        nextDate: { $gte: now, $lte: futureDate },
      })
      .sort({ nextDate: 1 })
      .exec();
  }

  async updateById(id: string, data: Partial<VaccineRecord>): Promise<VaccineRecordDocument | null> {
    return this.vaccineModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.vaccineModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
