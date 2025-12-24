import type { DangerLevel, Pedestrian } from '../types/simulation';

export const computeDistanceCm = (ped: Pedestrian): number => ((100 - ped.y) / 100) * 80 + 10;

export const evaluateDangerLevel = (pedestrians: Pedestrian[]): DangerLevel => {
  if (!pedestrians.length) {
    return 'safe';
  }

  const minDistance = Math.min(...pedestrians.map(computeDistanceCm));

  if (minDistance <= 35) {
    return 'critical';
  }

  if (minDistance <= 45) {
    return 'warning';
  }

  return 'safe';
};

export const getDangerColor = (dangerLevel: DangerLevel): string => {
  switch (dangerLevel) {
    case 'critical':
      return 'bg-red-600';
    case 'warning':
      return 'bg-orange-500';
    default:
      return 'bg-green-500';
  }
};

export const getDangerText = (dangerLevel: DangerLevel): string => {
  switch (dangerLevel) {
    case 'critical':
      return '危險！立即煞車';
    case 'warning':
      return '警告：減速慢行';
    default:
      return '安全';
  }
};
