import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PetDocument = Pet & Document;

@Schema({
  timestamps: true,
  collection: 'pets',
})
export class Pet {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['dog', 'cat', 'other'] })
  type: string;

  @Prop()
  breed: string;

  @Prop({ enum: ['male', 'female'] })
  gender: string;

  @Prop()
  birthDate: Date;

  @Prop()
  weight: number;

  @Prop()
  avatar: string;

  @Prop()
  chipId: string;

  @Prop()
  notes: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PetSchema = SchemaFactory.createForClass(Pet);

PetSchema.index({ userId: 1 });
