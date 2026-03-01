'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { walkApi, WalkRecord } from '@/services/walk';

export default function WalksPage() {
  const params = useParams();
  const petId = params.petId as string;
  const [records, setRecords] = useState<WalkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    startTime: new Date().toISOString().slice(0, 16),
    duration: '',
    distance: '',
    notes: '',
  });

  useEffect(() => {
    loadRecords();
  }, [petId]);

  const loadRecords = async () => {
    try {
      const data = await walkApi.getAll(petId);
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
      const startTime = new Date(form.startTime);
      const duration = Number(form.duration);
      const endTime = new Date(startTime.getTime() + duration * 60000);

      await walkApi.create(petId, {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration,
        distance: Number(form.distance),
        trackPoints: [],
        manual: true,
        notes: form.notes || undefined,
      });
      setShowForm(false);
      loadRecords();
    } catch (error) {
      console.error('添加失败', error);
      alert('添加失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条记录吗？')) return;
    try {
      await walkApi.delete(petId, id);
      setRecords(records.filter((r) => r._id !== id));
    } catch (error) {
      console.error('删除失败', error);
    }
  };

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) return `${h}小时${m}分钟`;
    return `${m}分钟`;
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
          <h1 className="text-2xl font-bold">遛弯记录</h1>
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
                <label className="block text-sm font-medium mb-1">开始时间</label>
                <input
                  type="datetime-local"
                  className="input"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">时长（分钟）</label>
                <input
                  type="number"
                  className="input"
                  placeholder="如：30"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">距离（米）</label>
              <input
                type="number"
                className="input"
                placeholder="如：1000"
                value={form.distance}
                onChange={(e) => setForm({ ...form, distance: e.target.value })}
                required
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
            <p className="text-gray-500">还没有遛弯记录</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record._id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold mb-2">
                      {new Date(record.startTime).toLocaleDateString()} 
                      {' '}
                      {new Date(record.startTime).toLocaleTimeString().slice(0, 5)}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>时长: {formatDuration(record.duration)}</span>
                      <span>距离: {(record.distance / 1000).toFixed(2)} km</span>
                    </div>
                    {record.notes && (
                      <p className="text-gray-500 text-sm mt-2">{record.notes}</p>
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
