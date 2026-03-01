import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HealthReportDocument = HealthReport & Document;

@Schema({
  timestamps: true,
  collection: 'health_reports',
})
export class HealthReport {
  @Prop({ type: Types.ObjectId, ref: 'Pet', required: true })
  petId: Types.ObjectId;

  @Prop({ required: true })
  weekStart: Date;

  @Prop({ required: true })
  weekEnd: Date;

  @Prop({
    type: {
      totalMeals: { type: Number, required: true },
      avgAmount: { type: Number, required: true },
      foodTypes: { type: [String], required: true },
    },
    required: true,
  })
  dietSummary: {
    totalMeals: number;
    avgAmount: number;
    foodTypes: string[];
  };

  @Prop({
    type: {
      totalTimes: { type: Number, required: true },
      totalDistance: { type: Number, required: true },
      totalDuration: { type: Number, required: true },
      avgDuration: { type: Number, required: true },
    },
    required: true,
  })
  walkSummary: {
    totalTimes: number;
    totalDistance: number;
    totalDuration: number;
    avgDuration: number;
  };

  @Prop([
    {
      vaccineName: { type: String, required: true },
      dueDate: { type: Date, required: true },
    },
  ])
  vaccineAlerts: { vaccineName: string; dueDate: Date }[];

  @Prop({ required: true })
  healthScore: number;

  @Prop([String])
  suggestions: string[];

  @Prop()
  createdAt: Date;
}

export const HealthReportSchema = SchemaFactory.createForClass(HealthReport);

HealthReportSchema.index({ petId: 1, weekStart: -1 });
