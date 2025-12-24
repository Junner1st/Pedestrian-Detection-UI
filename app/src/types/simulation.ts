export type CameraView = 'front' | 'rear';
export type DangerLevel = 'safe' | 'warning' | 'critical';

export interface Pedestrian {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  confidence: number;
  trackingTime: number;
}

export interface SystemStats {
  cpu: number;
  gpu: number;
  memory: number;
  latency: number;
}
