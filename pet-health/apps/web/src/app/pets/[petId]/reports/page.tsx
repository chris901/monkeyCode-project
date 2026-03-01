'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/services/api';

export interface HealthReport {
  _id: string;
  petId: string;
  weekStart: string;
  weekEnd: string;
  dietSummary: {
    totalMeals: number;
    avgAmount: number;
    foodTypes: string[];
  };
  walkSummary: {
    totalTimes: number;
    totalDistance: number;
    totalDuration: number;
    avgDuration: number;
  };
  vaccineAlerts: { vaccineName: string; dueDate: string }[];
  healthScore: number;
  suggestions: string[];
  createdAt: string;
}

export default function ReportsPage() {
  const params = useParams();
  const petId = params.petId as string;
  const [report, setReport] = useState<HealthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadLatestReport();
  }, [petId]);

  const loadLatestReport = async () => {
    try {
      const data = await api.get<any, HealthReport>(`/pets/${petId}/reports/latest`);
      setReport(data);
    } catch (error) {
      console.error('加载失败', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const data = await api.post<any, HealthReport>(`/pets/${petId}/reports/generate`);
      setReport(data);
    } catch (error) {
      console.error('生成失败', error);
      alert('生成失败');
    } finally {
      setGenerating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading) {
    return <main className="min-h-screen p-8"><div className="text-center">加载中...</div></main>;
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/pets/${petId}`} className="text-gray-500 hover:text-gray-700">
            &larr; 返回宠物详情
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">健康周报</h1>
          <button
            onClick={handleGenerate}
            className="btn btn-primary"
            disabled={generating}
          >
            {generating ? '生成中...' : '生成周报'}
          </button>
        </div>

        {!report ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-4">还没有周报数据</p>
            <button onClick={handleGenerate} className="btn btn-primary">
              生成第一份周报
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-bold mb-4">
                {new Date(report.weekStart).toLocaleDateString()} - {new Date(report.weekEnd).toLocaleDateString()}
              </h2>
              
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(report.healthScore)}`}>
                    {report.healthScore}
                  </div>
                  <div className="text-gray-500 mt-2">健康评分</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-bold mb-4">饮食统计</h3>
                <div className="space-y-2">
                  <p>本周用餐次数: <span className="font-bold">{report.dietSummary.totalMeals}</span> 次</p>
                  <p>平均食量: <span className="font-bold">{report.dietSummary.avgAmount}</span></p>
                  <p>食物类型: {report.dietSummary.foodTypes.join('、') || '-'}</p>
                </div>
              </div>

              <div className="card">
                <h3 className="font-bold mb-4">运动统计</h3>
                <div className="space-y-2">
                  <p>遛弯次数: <span className="font-bold">{report.walkSummary.totalTimes}</span> 次</p>
                  <p>总距离: <span className="font-bold">{(report.walkSummary.totalDistance / 1000).toFixed(2)}</span> km</p>
                  <p>总时长: <span className="font-bold">{report.walkSummary.totalDuration}</span> 分钟</p>
                  <p>平均时长: <span className="font-bold">{report.walkSummary.avgDuration}</span> 分钟</p>
                </div>
              </div>
            </div>

            {report.vaccineAlerts.length > 0 && (
              <div className="card bg-yellow-50">
                <h3 className="font-bold mb-4 text-yellow-800">疫苗提醒</h3>
                {report.vaccineAlerts.map((alert, i) => (
                  <p key={i} className="text-yellow-700">
                    {alert.vaccineName} - 到期日期: {new Date(alert.dueDate).toLocaleDateString()}
                  </p>
                ))}
              </div>
            )}

            <div className="card">
              <h3 className="font-bold mb-4">健康建议</h3>
              <ul className="list-disc list-inside space-y-2">
                {report.suggestions.map((s, i) => (
                  <li key={i} className="text-gray-700">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
