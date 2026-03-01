import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmotionRecord, EmotionRecordDocument } from './schemas/emotion-record.schema';

@Injectable()
export class EmotionRepository {
  constructor(
    @InjectModel(EmotionRecord.name) private emotionModel: Model<EmotionRecordDocument>,
  ) {}

  async create(data: Partial<EmotionRecord>): Promise<EmotionRecordDocument> {
    const record = new this.emotionModel(data);
    return record.save();
  }

  async findByPetId(petId: string, limit: number = 10): Promise<EmotionRecordDocument[]> {
    return this.emotionModel
      .find({ petId })
      .sort({ analyzedAt: -1 })
      .limit(limit)
      .exec();
  }
}
