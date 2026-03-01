import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from './schemas/pet.schema';

@Injectable()
export class PetRepository {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<PetDocument>,
  ) {}

  async create(data: Partial<Pet>): Promise<PetDocument> {
    const pet = new this.petModel(data);
    return pet.save();
  }

  async findByUserId(userId: string): Promise<PetDocument[]> {
    return this.petModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<PetDocument | null> {
    return this.petModel.findById(id).exec();
  }

  async findByIdAndUserId(id: string, userId: string): Promise<PetDocument | null> {
    return this.petModel.findOne({ _id: id, userId }).exec();
  }

  async updateById(id: string, data: Partial<Pet>): Promise<PetDocument | null> {
    return this.petModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.petModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
