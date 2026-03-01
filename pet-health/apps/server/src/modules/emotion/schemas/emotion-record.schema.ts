import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmotionRecordDocument = EmotionRecord & Document;

@Schema({
  timestamps: true,
  collection: 'emotion_records',
})
export class EmotionRecord {
  @Prop({ type: Types.ObjectId, ref: 'Pet', required: true })
  petId: Types.ObjectId;

  @Prop({ required: true })
  photoUrl: string;

  @Prop({ required: true, enum: ['happy', 'sad', 'angry', 'anxious', 'neutral'] })
  emotion: string;

  @Prop({ required: true })
  confidence: number;

  @Prop({ required: true })
  analyzedAt: Date;

  @Prop()
  createdAt: Date;
}

export const EmotionRecordSchema = SchemaFactory.createForClass(EmotionRecord);

EmotionRecordSchema.index({ petId: 1, analyzedAt: -1 });
