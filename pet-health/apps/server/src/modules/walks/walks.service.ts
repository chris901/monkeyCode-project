import { Injectable, NotFoundException } from '@nestjs/common';
import { WalkRepository } from './repositories/walk.repository';
import { CreateWalkDto, UpdateWalkDto } from './dto/walk.dto';

@Injectable()
export class WalksService {
  constructor(private walkRepository: WalkRepository) {}

  async create(petId: string, dto: CreateWalkDto) {
    const trackPoints = dto.trackPoints.map((p) => ({
      lat: p.lat,
      lng: p.lng,
      timestamp: new Date(p.timestamp),
    }));

    const compressedPoints = this.compressTrackPoints(trackPoints, 500);

    return this.walkRepository.create({
      ...dto,
      petId: petId as any,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      trackPoints: compressedPoints,
    });
  }

  async findAll(petId: string) {
    return this.walkRepository.findByPetId(petId);
  }

  async update(petId: string, id: string, dto: UpdateWalkDto) {
    const record = await this.walkRepository.findById(id);
    if (!record || record.petId.toString() !== petId) {
      throw new NotFoundException('记录不存在');
    }

    const updateData: any = { ...dto };
    if (dto.startTime) updateData.startTime = new Date(dto.startTime);
    if (dto.endTime) updateData.endTime = new Date(dto.endTime);

    return this.walkRepository.updateById(id, updateData);
  }

  async remove(petId: string, id: string) {
    const record = await this.walkRepository.findById(id);
    if (!record || record.petId.toString() !== petId) {
      throw new NotFoundException('记录不存在');
    }
    await this.walkRepository.deleteById(id);
    return { message: '删除成功' };
  }

  private compressTrackPoints(
    points: { lat: number; lng: number; timestamp: Date }[],
    maxPoints: number,
  ): { lat: number; lng: number; timestamp: Date }[] {
    if (points.length <= maxPoints) {
      return points;
    }

    const step = Math.ceil(points.length / maxPoints);
    const compressed: { lat: number; lng: number; timestamp: Date }[] = [];
    
    for (let i = 0; i < points.length; i += step) {
      compressed.push(points[i]);
    }

    if (compressed[compressed.length - 1] !== points[points.length - 1]) {
      compressed.push(points[points.length - 1]);
    }

    return compressed;
  }
}
