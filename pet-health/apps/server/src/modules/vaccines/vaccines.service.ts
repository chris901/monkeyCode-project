import { Injectable, NotFoundException } from '@nestjs/common';
import { VaccineRepository } from './repositories/vaccine.repository';
import { CreateVaccineDto, UpdateVaccineDto } from './dto/vaccine.dto';

@Injectable()
export class VaccinesService {
  constructor(private vaccineRepository: VaccineRepository) {}

  async create(petId: string, dto: CreateVaccineDto) {
    return this.vaccineRepository.create({
      ...dto,
      petId: petId as any,
      inoculationDate: new Date(dto.inoculationDate),
      nextDate: dto.nextDate ? new Date(dto.nextDate) : undefined,
    });
  }

  async findAll(petId: string) {
    return this.vaccineRepository.findByPetId(petId);
  }

  async getAlerts(petId: string) {
    return this.vaccineRepository.findUpcomingAlerts(petId, 30);
  }

  async update(petId: string, id: string, dto: UpdateVaccineDto) {
    const record = await this.vaccineRepository.findById(id);
    if (!record || record.petId.toString() !== petId) {
      throw new NotFoundException('记录不存在');
    }

    const updateData: any = { ...dto };
    if (dto.inoculationDate) {
      updateData.inoculationDate = new Date(dto.inoculationDate);
    }
    if (dto.nextDate) {
      updateData.nextDate = new Date(dto.nextDate);
    }

    return this.vaccineRepository.updateById(id, updateData);
  }

  async remove(petId: string, id: string) {
    const record = await this.vaccineRepository.findById(id);
    if (!record || record.petId.toString() !== petId) {
      throw new NotFoundException('记录不存在');
    }
    await this.vaccineRepository.deleteById(id);
    return { message: '删除成功' };
  }
}
