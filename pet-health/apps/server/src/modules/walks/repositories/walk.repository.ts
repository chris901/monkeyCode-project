import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalkRecord, WalkRecordDocument } from './schemas/walk-record.schema';

@Injectable()
export class WalkRepository {
  constructor(
    @InjectModel(WalkRecord.name) private walkModel: Model<WalkRecordDocument>,
  ) {}

  async create(data: Partial<WalkRecord>): Promise<WalkRecordDocument> {
    const record = new this.walkModel(data);
    return record.save();
  }

  async findByPetId(petId: string, limit: number = 20): Promise<WalkRecordDocument[]> {
    return this.walkModel
      .find({ petId })
      .sort({ startTime: -1 })
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<WalkRecordDocument | null> {
    return this.walkModel.findById(id).exec();
  }

  async updateById(id: string, data: Partial<WalkRecord>): Promise<WalkRecordDocument | null> {
    return this.walkModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.walkModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findBetweenDates(
    petId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<WalkRecordDocument[]> {
    return this.walkModel
      .find({
        petId,
        startTime: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }
}
