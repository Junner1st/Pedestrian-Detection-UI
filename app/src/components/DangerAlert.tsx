import { AlertTriangle } from 'lucide-react';
import { getDangerColor, getDangerText } from '../utils/danger';
import type { DangerLevel } from '../types/simulation';

interface DangerAlertProps {
  dangerLevel: DangerLevel;
}

const DangerAlert = ({ dangerLevel }: DangerAlertProps) => (
  <div className={`${getDangerColor(dangerLevel)} rounded-xl p-6 shadow-2xl transition-all duration-300`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <AlertTriangle className="w-12 h-12 text-white animate-pulse" />
        <div>
          <div className="text-white text-sm font-semibold mb-1">碰撞風險等級</div>
          <div className="text-white text-3xl font-bold">{getDangerText(dangerLevel)}</div>
        </div>
      </div>
      {dangerLevel === 'critical' && <div className="text-white text-6xl font-bold animate-pulse">🛑</div>}
    </div>
  </div>
);

export default DangerAlert;
