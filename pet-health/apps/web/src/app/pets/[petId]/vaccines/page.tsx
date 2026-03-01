'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { vaccineApi, VaccineRecord } from '@/services/records';

export default function VaccinesPage() {
  const params = useParams();
  const petId = params.petId as string;
  const [records, setRecords] = useState<VaccineRecord[]>([]);
  const [alerts, setAlerts] = useState<VaccineRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    vaccineName: '',
    type: 'combined',
    inoculationDate: new Date().toISOString().split('T')[0],
    nextDate: '',
    hospital: '',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, [petId]);

  const loadData = async () => {
    try {
      const [recordsData, alertsData] = await Promise.all([
        vaccineApi.getAll(petId),
        vaccineApi.getAlerts(petId),
      ]);
      setRecords(recordsData);
      setAlerts(alertsData);
    } catch (error) {
      console.error('加载失败', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await vaccineApi.create(petId, {
        vaccineName: form.vaccineName,
        type: form.type,
        inoculationDate: form.inoculationDate,
        nextDate: form.nextDate || undefined,
        hospital: form.hospital || undefined,
        notes: form.notes || undefined,
      });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error('添加失败', error);
      alert('添加失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条记录吗？')) return;
    try {
      await vaccineApi.delete(petId, id);
      setRecords(records.filter((r) => r._id !== id));
    } catch (error) {
      console.error('删除失败', error);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      rabies: '狂犬疫苗',
      combined: '联苗',
      other: '其他',
    };
    return labels[type] || type;
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
          <h1 className="text-2xl font-bold">疫苗记录</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? '取消' : '添加记录'}
          </button>
        </div>

        {alerts.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-yellow-800 mb-2">疫苗到期提醒</h3>
            {alerts.map((alert) => (
              <p key={alert._id} className="text-yellow-700">
                {alert.vaccineName} - 下次接种日期：{new Date(alert.nextDate!).toLocaleDateString()}
              </p>
            ))}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">疫苗名称</label>
                <input
                  type="text"
                  className="input"
                  placeholder="如：六联疫苗"
                  value={form.vaccineName}
                  onChange={(e) => setForm({ ...form, vaccineName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">类型</label>
                <select
                  className="input"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="combined">联苗</option>
                  <option value="rabies">狂犬疫苗</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">接种日期</label>
                <input
                  type="date"
                  className="input"
                  value={form.inoculationDate}
                  onChange={(e) => setForm({ ...form, inoculationDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">下次接种日期</label>
                <input
                  type="date"
                  className="input"
                  value={form.nextDate}
                  onChange={(e) => setForm({ ...form, nextDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">接种医院</label>
              <input
                type="text"
                className="input"
                value={form.hospital}
                onChange={(e) => setForm({ ...form, hospital: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">备注</label>
              <input
                type="text"
                className="input"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary">保存</button>
          </form>
        )}

        {records.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">还没有疫苗记录</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record._id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold">{record.vaccineName}</span>
                      <span className="text-gray-500 text-sm">
                        {getTypeLabel(record.type)}
                      </span>
                    </div>
                    <p className="text-sm">
                      接种日期：{new Date(record.inoculationDate).toLocaleDateString()}
                    </p>
                    {record.nextDate && (
                      <p className="text-sm text-yellow-600">
                        下次接种：{new Date(record.nextDate).toLocaleDateString()}
                      </p>
                    )}
                    {record.hospital && (
                      <p className="text-gray-500 text-sm">医院：{record.hospital}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
