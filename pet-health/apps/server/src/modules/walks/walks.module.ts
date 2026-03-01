import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalksController } from './walks.controller';
import { WalksService } from './walks.service';
import { WalkRecord, WalkRecordSchema } from './schemas/walk-record.schema';
import { WalkRepository } from './repositories/walk.repository';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WalkRecord.name, schema: WalkRecordSchema }]),
    PetsModule,
  ],
  controllers: [WalksController],
  providers: [WalksService, WalkRepository],
  exports: [WalksService, WalkRepository],
})
export class WalksModule {}
