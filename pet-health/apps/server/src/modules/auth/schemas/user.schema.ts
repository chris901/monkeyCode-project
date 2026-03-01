import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop()
  openid: string;

  @Prop()
  unionid: string;

  @Prop({ unique: true, sparse: true })
  phone: string;

  @Prop()
  password: string;

  @Prop()
  nickname: string;

  @Prop()
  avatar: string;

  @Prop({ type: [String], default: [] })
  loginType: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ phone: 1 }, { unique: true, sparse: true });
UserSchema.index({ openid: 1 }, { sparse: true });
