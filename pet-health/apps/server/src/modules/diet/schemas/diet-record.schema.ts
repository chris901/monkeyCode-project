import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DietRecordDocument = DietRecord & Document;

@Schema({
  timestamps: true,
  collection: 'diet_records',
})
export class DietRecord {
  @Prop({ type: Types.ObjectId, ref: 'Pet', required: true })
  petId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ['breakfast', 'lunch', 'dinner', 'snack'] })
  mealType: string;

  @Prop({ required: true })
  foodType: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['g', 'cup', 'can'] })
  unit: string;

  @Prop()
  notes: string;

  @Prop()
  createdAt: Date;
}

export const DietRecordSchema = SchemaFactory.createForClass(DietRecord);

DietRecordSchema.index({ petId: 1, date: -1 });
