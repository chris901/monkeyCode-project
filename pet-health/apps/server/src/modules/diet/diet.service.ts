import { Injectable, NotFoundException } from '@nestjs/common';
import { DietRepository } from './repositories/diet.repository';
import { CreateDietDto, UpdateDietDto, QueryDietDto } from './dto/diet.dto';

@Injectable()
export class DietService {
  constructor(private dietRepository: DietRepository) {}

  async create(petId: string, dto: CreateDietDto) {
    return this.dietRepository.create({
      ...dto,
      petId: petId as any,
      date: new Date(dto.date),
    });
  }

  async findAll(petId: string, query: QueryDietDto) {
    return this.dietRepository.findByPetId(
      petId,
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );
  }

  async update(petId: string, id: string, dto: UpdateDietDto) {
    const record = await this.dietRepository.findById(id);
    if (!record || record.petId.toString() !== petId) {
      throw new NotFoundException('记录不存在');
    }

    const updateData: any = { ...dto };
    if (dto.date) {
      updateData.date = new Date(dto.date);
    }

    return this.dietRepository.updateById(id, updateData);
  }

  async remove(petId: string, id: string) {
    const record = await this.dietRepository.findById(id);
    if (!record || record.petId.toString() !== petId) {
      throw new NotFoundException('记录不存在');
    }
    await this.dietRepository.deleteById(id);
    return { message: '删除成功' };
  }
}
