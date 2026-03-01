import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DietRecord, DietRecordDocument } from './schemas/diet-record.schema';

@Injectable()
export class DietRepository {
  constructor(
    @InjectModel(DietRecord.name) private dietModel: Model<DietRecordDocument>,
  ) {}

  async create(data: Partial<DietRecord>): Promise<DietRecordDocument> {
    const record = new this.dietModel(data);
    return record.save();
  }

  async findByPetId(petId: string, startDate?: Date, endDate?: Date): Promise<DietRecordDocument[]> {
    const query: any = { petId };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }
    return this.dietModel.find(query).sort({ date: -1 }).exec();
  }

  async findById(id: string): Promise<DietRecordDocument | null> {
    return this.dietModel.findById(id).exec();
  }

  async updateById(id: string, data: Partial<DietRecord>): Promise<DietRecordDocument | null> {
    return this.dietModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.dietModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
