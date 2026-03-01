import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import { EmotionRecord, EmotionRecordSchema } from './schemas/emotion-record.schema';
import { EmotionRepository } from './repositories/emotion.repository';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmotionRecord.name, schema: EmotionRecordSchema }]),
    PetsModule,
  ],
  controllers: [EmotionController],
  providers: [EmotionService, EmotionRepository],
  exports: [EmotionService, EmotionRepository],
})
export class EmotionModule {}
