'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { petsApi, Pet } from '@/services/pets';
import { useAuthStore } from '@/stores/auth';

export default function PetsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadPets();
  }, [user]);

  const loadPets = async () => {
    try {
      const data = await petsApi.getAll();
      setPets(data);
    } catch (error) {
      console.error('加载宠物列表失败', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个宠物档案吗？')) return;
    try {
      await petsApi.delete(id);
      setPets(pets.filter((p) => p._id !== id));
    } catch (error) {
      console.error('删除失败', error);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      dog: '狗',
      cat: '猫',
      other: '其他',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="text-center">加载中...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">我的宠物</h1>
          <Link href="/pets/new" className="btn btn-primary">
            添加宠物
          </Link>
        </div>

        {pets.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-4">还没有添加宠物</p>
            <Link href="/pets/new" className="btn btn-primary">
              添加第一只宠物
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {pets.map((pet) => (
              <div key={pet._id} className="card">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                    {pet.type === 'dog' ? '🐕' : pet.type === 'cat' ? '🐱' : '🐾'}
                  </div>
                  <div className="flex-1">
                    <Link href={`/pets/${pet._id}`} className="font-bold text-lg hover:text-primary-500">
                      {pet.name}
                    </Link>
                    <p className="text-gray-500 text-sm">
                      {getTypeLabel(pet.type)}
                      {pet.breed && ` · ${pet.breed}`}
                    </p>
                    {pet.weight && (
                      <p className="text-gray-500 text-sm">体重: {pet.weight} kg</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(pet._id)}
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
