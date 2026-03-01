'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { dietApi, DietRecord } from '@/services/records';

export default function DietPage() {
  const params = useParams();
  const router = useRouter();
  const petId = params.petId as string;
  const [records, setRecords] = useState<DietRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    mealType: 'breakfast',
    foodType: '',
    amount: '',
    unit: 'g',
    notes: '',
  });

  useEffect(() => {
    loadRecords();
  }, [petId]);

  const loadRecords = async () => {
    try {
      const data = await dietApi.getAll(petId);
      setRecords(data);
    } catch (error) {
      console.error('加载失败', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dietApi.create(petId, {
        date: form.date,
        mealType: form.mealType,
        foodType: form.foodType,
        amount: Number(form.amount),
        unit: form.unit,
        notes: form.notes || undefined,
      });
      setShowForm(false);
      loadRecords();
      setForm({
        date: new Date().toISOString().split('T')[0],
        mealType: 'breakfast',
        foodType: '',
        amount: '',
        unit: 'g',
        notes: '',
      });
    } catch (error) {
      console.error('添加失败', error);
      alert('添加失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条记录吗？')) return;
    try {
      await dietApi.delete(petId, id);
      setRecords(records.filter((r) => r._id !== id));
    } catch (error) {
      console.error('删除失败', error);
    }
  };

  const getMealTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      breakfast: '早餐',
      lunch: '午餐',
      dinner: '晚餐',
      snack: '零食',
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
          <h1 className="text-2xl font-bold">饮食记录</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? '取消' : '添加记录'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">日期</label>
                <input
                  type="date"
                  className="input"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">餐次</label>
                <select
                  className="input"
                  value={form.mealType}
                  onChange={(e) => setForm({ ...form, mealType: e.target.value })}
                >
                  <option value="breakfast">早餐</option>
                  <option value="lunch">午餐</option>
                  <option value="dinner">晚餐</option>
                  <option value="snack">零食</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">食物类型</label>
                <input
                  type="text"
                  className="input"
                  placeholder="如：狗粮、罐头"
                  value={form.foodType}
                  onChange={(e) => setForm({ ...form, foodType: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">食量</label>
                <input
                  type="number"
                  className="input"
                  placeholder="数量"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">单位</label>
              <select
                className="input"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
              >
                <option value="g">克</option>
                <option value="cup">杯</option>
                <option value="can">罐</option>
              </select>
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
            <p className="text-gray-500">还没有饮食记录</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record._id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold">{getMealTypeLabel(record.mealType)}</span>
                      <span className="text-gray-500 text-sm">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p>
                      {record.foodType} - {record.amount} {record.unit}
                    </p>
                    {record.notes && (
                      <p className="text-gray-500 text-sm mt-1">{record.notes}</p>
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
