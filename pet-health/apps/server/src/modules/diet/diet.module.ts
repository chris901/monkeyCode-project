import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { DietRecord, DietRecordSchema } from './schemas/diet-record.schema';
import { DietRepository } from './repositories/diet.repository';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DietRecord.name, schema: DietRecordSchema }]),
    PetsModule,
  ],
  controllers: [DietController],
  providers: [DietService, DietRepository],
  exports: [DietService, DietRepository],
})
export class DietModule {}
