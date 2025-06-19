import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: string;
  changeType?: 'up' | 'down';
  className?: string;
}

export default function StatCard({ title, value, icon, change, changeType, className = '' }: StatCardProps) {
  return (
    <div className={`bg-gray-900 rounded-xl p-6 flex flex-col gap-2 shadow-md border border-gray-700 ${className}`}>
      <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
        {icon}
        {title}
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      {change && (
        <div className={`text-xs font-semibold flex items-center gap-1 ${changeType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {changeType === 'up' ? '▲' : '▼'} {change}
        </div>
      )}
    </div>
  );
} 