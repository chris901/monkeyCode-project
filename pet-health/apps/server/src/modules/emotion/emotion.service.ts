import { Injectable } from '@nestjs/common';
import { EmotionRepository } from './repositories/emotion.repository';

@Injectable()
export class EmotionService {
  constructor(private emotionRepository: EmotionRepository) {}

  async analyze(petId: string, photoUrl: string) {
    const emotions = ['happy', 'sad', 'angry', 'anxious', 'neutral'] as const;
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    const confidence = 0.6 + Math.random() * 0.35;

    const record = await this.emotionRepository.create({
      petId: petId as any,
      photoUrl,
      emotion,
      confidence: Math.round(confidence * 100) / 100,
      analyzedAt: new Date(),
    });

    return record;
  }

  async getHistory(petId: string) {
    return this.emotionRepository.findByPetId(petId, 20);
  }
}
