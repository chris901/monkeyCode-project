'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { petsApi } from '@/services/pets';

export default function NewPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'dog' as 'dog' | 'cat' | 'other',
    breed: '',
    gender: '',
    birthDate: '',
    weight: '',
    chipId: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await petsApi.create({
        name: form.name,
        type: form.type,
        breed: form.breed || undefined,
        gender: form.gender as 'male' | 'female' | undefined,
        birthDate: form.birthDate || undefined,
        weight: form.weight ? Number(form.weight) : undefined,
        chipId: form.chipId || undefined,
        notes: form.notes || undefined,
      });
      router.push('/pets');
    } catch (error) {
      console.error('创建失败', error);
      alert('创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">添加宠物</h1>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              名字 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              类型 <span className="text-red-500">*</span>
            </label>
            <select
              className="input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as any })}
            >
              <option value="dog">狗</option>
              <option value="cat">猫</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">品种</label>
            <input
              type="text"
              className="input"
              value={form.breed}
              onChange={(e) => setForm({ ...form, breed: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">性别</label>
            <select
              className="input"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">请选择</option>
              <option value="male">公</option>
              <option value="female">母</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">生日</label>
            <input
              type="date"
              className="input"
              value={form.birthDate}
              onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">体重 (kg)</label>
            <input
              type="number"
              step="0.1"
              className="input"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">芯片号</label>
            <input
              type="text"
              className="input"
              value={form.chipId}
              onChange={(e) => setForm({ ...form, chipId: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">备注</label>
            <textarea
              className="input"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="btn btn-secondary flex-1"
              onClick={() => router.back()}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
