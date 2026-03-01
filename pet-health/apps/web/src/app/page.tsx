import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          宠物健康管家
        </h1>
        <p className="text-gray-600 mb-8">
          记录宠物的饮食、疫苗、遛弯轨迹，生成健康周报
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="btn btn-primary">
            登录
          </Link>
          <Link href="/register" className="btn btn-secondary">
            注册
          </Link>
        </div>
      </div>
    </main>
  );
}
