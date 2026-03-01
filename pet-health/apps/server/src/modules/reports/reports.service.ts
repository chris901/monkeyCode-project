import { Injectable } from '@nestjs/common';
import { ReportRepository } from './repositories/report.repository';
import { DietRepository } from '../diet/repositories/diet.repository';
import { WalkRepository } from '../walks/repositories/walk.repository';
import { VaccineRepository } from '../vaccines/repositories/vaccine.repository';

@Injectable()
export class ReportsService {
  constructor(
    private reportRepository: ReportRepository,
    private dietRepository: DietRepository,
    private walkRepository: WalkRepository,
    private vaccineRepository: VaccineRepository,
  ) {}

  async findAll(petId: string) {
    return this.reportRepository.findByPetId(petId);
  }

  async findLatest(petId: string) {
    return this.reportRepository.findLatest(petId);
  }

  async generate(petId: string) {
    const { start, end } = this.getWeekRange();

    const existing = await this.reportRepository.findByWeek(petId, start);
    if (existing) {
      return existing;
    }

    const [dietRecords, walkRecords, vaccineAlerts] = await Promise.all([
      this.dietRepository.findByPetId(petId, start, end),
      this.walkRepository.findBetweenDates(petId, start, end),
      this.vaccineRepository.findUpcomingAlerts(petId, 30),
    ]);

    const dietSummary = this.calculateDietSummary(dietRecords);
    const walkSummary = this.calculateWalkSummary(walkRecords);
    const healthScore = this.calculateHealthScore(dietSummary, walkSummary, vaccineAlerts);
    const suggestions = this.generateSuggestions(dietSummary, walkSummary, vaccineAlerts);

    return this.reportRepository.create({
      petId: petId as any,
      weekStart: start,
      weekEnd: end,
      dietSummary,
      walkSummary,
      vaccineAlerts: vaccineAlerts.map((v) => ({
        vaccineName: v.vaccineName,
        dueDate: v.nextDate!,
      })),
      healthScore,
      suggestions,
    });
  }

  private getWeekRange(): { start: Date; end: Date } {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(now);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  private calculateDietSummary(records: any[]) {
    const totalMeals = records.length;
    const avgAmount = totalMeals > 0
      ? records.reduce((sum, r) => sum + r.amount, 0) / totalMeals
      : 0;
    const foodTypes = [...new Set(records.map((r) => r.foodType))];

    return { totalMeals, avgAmount: Math.round(avgAmount * 10) / 10, foodTypes };
  }

  private calculateWalkSummary(records: any[]) {
    const totalTimes = records.length;
    const totalDistance = records.reduce((sum, r) => sum + r.distance, 0);
    const totalDuration = records.reduce((sum, r) => sum + r.duration, 0);
    const avgDuration = totalTimes > 0 ? Math.round(totalDuration / totalTimes) : 0;

    return { totalTimes, totalDistance, totalDuration, avgDuration };
  }

  private calculateHealthScore(
    dietSummary: any,
    walkSummary: any,
    vaccineAlerts: any[],
  ): number {
    let score = 100;

    if (dietSummary.totalMeals < 14) {
      score -= (14 - dietSummary.totalMeals) * 2;
    }

    if (walkSummary.totalTimes < 7) {
      score -= (7 - walkSummary.totalTimes) * 5;
    }

    score -= vaccineAlerts.length * 5;

    return Math.max(0, Math.min(100, score));
  }

  private generateSuggestions(
    dietSummary: any,
    walkSummary: any,
    vaccineAlerts: any[],
  ): string[] {
    const suggestions: string[] = [];

    if (dietSummary.totalMeals < 14) {
      suggestions.push('建议保持规律的喂食习惯，每天至少记录2次饮食');
    }

    if (walkSummary.totalTimes < 7) {
      suggestions.push('建议每天带宠物遛弯，保持充足的运动量');
    }

    if (vaccineAlerts.length > 0) {
      suggestions.push(`有${vaccineAlerts.length}个疫苗即将到期，请及时接种`);
    }

    if (suggestions.length === 0) {
      suggestions.push('宠物健康状况良好，继续保持！');
    }

    return suggestions;
  }
}
