import { useEffect, useState } from 'react';
import type { SystemStats } from '../types/simulation';

const INITIAL_STATS: SystemStats = {
  cpu: 45,
  gpu: 62,
  memory: 2.3,
  latency: 23
};

export const useSystemStats = () => {
  const [stats, setStats] = useState<SystemStats>(INITIAL_STATS);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: 40 + Math.random() * 20,
        gpu: 55 + Math.random() * 20,
        memory: 2 + Math.random() * 0.8,
        latency: 20 + Math.random() * 10
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
