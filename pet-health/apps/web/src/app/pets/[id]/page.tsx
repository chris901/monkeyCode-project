'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { petsApi, Pet } from '@/services/pets';

export default function PetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const petId = params.id as string;
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPet();
  }, [petId]);

  const loadPet = async () => {
    try {
      const data = await petsApi.getById(petId);
      setPet(data);
    } catch (error) {
      console.error('加载失败', error);
      router.push('/pets');
    } finally {
      setLoading(false);
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

  const getGenderLabel = (gender?: string) => {
    if (!gender) return '-';
    return gender === 'male' ? '公' : '母';
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="text-center">加载中...</div>
      </main>
    );
  }

  if (!pet) {
    return null;
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/pets" className="text-gray-500 hover:text-gray-700">
            &larr; 返回列表
          </Link>
        </div>

        <div className="card">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl">
              {pet.type === 'dog' ? '🐕' : pet.type === 'cat' ? '🐱' : '🐾'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{pet.name}</h1>
              <p className="text-gray-500">
                {getTypeLabel(pet.type)}
                {pet.breed && ` · ${pet.breed}`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">性别</p>
              <p className="font-medium">{getGenderLabel(pet.gender)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">体重</p>
              <p className="font-medium">{pet.weight ? `${pet.weight} kg` : '-'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">生日</p>
              <p className="font-medium">
                {pet.birthDate ? new Date(pet.birthDate).toLocaleDateString() : '-'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">芯片号</p>
              <p className="font-medium">{pet.chipId || '-'}</p>
            </div>
          </div>

          {pet.notes && (
            <div className="mb-6">
              <p className="text-gray-500 text-sm mb-1">备注</p>
              <p>{pet.notes}</p>
            </div>
          )}

          <div className="border-t pt-6">
            <h2 className="font-bold mb-4">功能菜单</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href={`/pets/${petId}/diet`}
                className="btn bg-orange-50 text-orange-600 hover:bg-orange-100"
              >
                饮食记录
              </Link>
              <Link
                href={`/pets/${petId}/vaccines`}
                className="btn bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                疫苗记录
              </Link>
              <Link
                href={`/pets/${petId}/walks`}
                className="btn bg-green-50 text-green-600 hover:bg-green-100"
              >
                遛弯记录
              </Link>
              <Link
                href={`/pets/${petId}/reports`}
                className="btn bg-purple-50 text-purple-600 hover:bg-purple-100"
              >
                健康周报
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
