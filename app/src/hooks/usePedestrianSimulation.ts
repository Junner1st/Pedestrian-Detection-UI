import { useEffect, useRef, useState } from 'react';
import type { CameraView, DangerLevel, Pedestrian } from '../types/simulation';
import { evaluateDangerLevel } from '../utils/danger';

const createPedestrian = (id: number): Pedestrian => {
  const fromLeft = Math.random() > 0.5;
  const y = 20 + Math.random() * 60;

  return {
    id,
    x: fromLeft ? -5 : 105,
    y,
    speedX: fromLeft ? 0.3 + Math.random() * 0.3 : -(0.3 + Math.random() * 0.3),
    speedY: (Math.random() - 0.5) * 0.2,
    confidence: 75 + Math.random() * 23,
    trackingTime: 0
  };
};

export const usePedestrianSimulation = (activeCamera: CameraView) => {
  const [pedestrians, setPedestrians] = useState<Pedestrian[]>([]);
  const [dangerLevel, setDangerLevel] = useState<DangerLevel>('safe');
  const nextIdRef = useRef(0);

  useEffect(() => {
    const initialCount = 3;
    const initial = Array.from({ length: initialCount }, (_, idx) => createPedestrian(idx));
    nextIdRef.current = initialCount;
    setPedestrians(initial);
    setDangerLevel(evaluateDangerLevel(initial));
  }, [activeCamera]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPedestrians(prev => {
        let updated = prev.map(ped => {
          let newX = ped.x + ped.speedX;
          let newY = ped.y + ped.speedY;
          let newSpeedY = ped.speedY;

          if (newY < 10 || newY > 85) {
            newSpeedY = -ped.speedY;
            newY = Math.max(10, Math.min(85, newY));
          }

          return {
            ...ped,
            x: newX,
            y: newY,
            speedY: newSpeedY,
            trackingTime: ped.trackingTime + 0.05
          };
        });

        updated = updated.filter(ped => (ped.speedX > 0 ? ped.x < 105 : ped.x > -5));

        if (Math.random() < 0.03) {
          updated = [...updated, createPedestrian(nextIdRef.current)];
          nextIdRef.current += 1;
        }

        setDangerLevel(evaluateDangerLevel(updated));
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return { pedestrians, dangerLevel };
};
