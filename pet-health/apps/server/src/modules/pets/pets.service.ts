import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PetRepository } from './repositories/pet.repository';
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto';

@Injectable()
export class PetsService {
  constructor(private petRepository: PetRepository) {}

  async create(userId: string, dto: CreatePetDto) {
    const pet = await this.petRepository.create({
      ...dto,
      userId: userId as any,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
    });
    return pet;
  }

  async findAll(userId: string) {
    return this.petRepository.findByUserId(userId);
  }

  async findOne(userId: string, id: string) {
    const pet = await this.petRepository.findByIdAndUserId(id, userId);
    if (!pet) {
      throw new NotFoundException('宠物不存在');
    }
    return pet;
  }

  async update(userId: string, id: string, dto: UpdatePetDto) {
    const pet = await this.petRepository.findByIdAndUserId(id, userId);
    if (!pet) {
      throw new NotFoundException('宠物不存在');
    }

    const updateData: any = { ...dto };
    if (dto.birthDate) {
      updateData.birthDate = new Date(dto.birthDate);
    }

    return this.petRepository.updateById(id, updateData);
  }

  async remove(userId: string, id: string) {
    const pet = await this.petRepository.findByIdAndUserId(id, userId);
    if (!pet) {
      throw new NotFoundException('宠物不存在');
    }
    await this.petRepository.deleteById(id);
    return { message: '删除成功' };
  }
}
