import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet, PetSchema } from './schemas/pet.schema';
import { PetRepository } from './repositories/pet.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
  ],
  controllers: [PetsController],
  providers: [PetsService, PetRepository],
  exports: [PetsService, PetRepository],
})
export class PetsModule {}
