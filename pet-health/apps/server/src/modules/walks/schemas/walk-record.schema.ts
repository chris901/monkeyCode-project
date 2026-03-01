import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WalkRecordDocument = WalkRecord & Document;

@Schema({
  timestamps: true,
  collection: 'walk_records',
})
export class WalkRecord {
  @Prop({ type: Types.ObjectId, ref: 'Pet', required: true })
  petId: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  distance: number;

  @Prop([
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      timestamp: { type: Date, required: true },
    },
  ])
  trackPoints: { lat: number; lng: number; timestamp: Date }[];

  @Prop({ default: false })
  manual: boolean;

  @Prop()
  notes: string;

  @Prop()
  createdAt: Date;
}

export const WalkRecordSchema = SchemaFactory.createForClass(WalkRecord);

WalkRecordSchema.index({ petId: 1, startTime: -1 });
WalkRecordSchema.index({ 'trackPoints': '2dsphere' });
