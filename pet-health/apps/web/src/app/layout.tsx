import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '宠物健康管家',
  description: '记录宠物的饮食、疫苗、遛弯轨迹，生成健康周报',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
