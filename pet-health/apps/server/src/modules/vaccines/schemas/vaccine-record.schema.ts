import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VaccineRecordDocument = VaccineRecord & Document;

@Schema({
  timestamps: true,
  collection: 'vaccine_records',
})
export class VaccineRecord {
  @Prop({ type: Types.ObjectId, ref: 'Pet', required: true })
  petId: Types.ObjectId;

  @Prop({ required: true })
  vaccineName: string;

  @Prop({ required: true, enum: ['rabies', 'combined', 'other'] })
  type: string;

  @Prop({ required: true })
  inoculationDate: Date;

  @Prop()
  nextDate: Date;

  @Prop()
  hospital: string;

  @Prop()
  notes: string;

  @Prop()
  createdAt: Date;
}

export const VaccineRecordSchema = SchemaFactory.createForClass(VaccineRecord);

VaccineRecordSchema.index({ petId: 1, inoculationDate: -1 });
VaccineRecordSchema.index({ petId: 1, nextDate: 1 });
