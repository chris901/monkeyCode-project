import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';
import { VaccineRecord, VaccineRecordSchema } from './schemas/vaccine-record.schema';
import { VaccineRepository } from './repositories/vaccine.repository';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VaccineRecord.name, schema: VaccineRecordSchema }]),
    PetsModule,
  ],
  controllers: [VaccinesController],
  providers: [VaccinesService, VaccineRepository],
  exports: [VaccinesService, VaccineRepository],
})
export class VaccinesModule {}
