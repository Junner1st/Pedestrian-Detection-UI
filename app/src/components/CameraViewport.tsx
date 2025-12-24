import { Users } from 'lucide-react';
import type { CameraView, Pedestrian, SystemStats } from '../types/simulation';
import { computeDistanceCm } from '../utils/danger';

interface CameraViewportProps {
  pedestrians: Pedestrian[];
  activeCamera: CameraView;
  debugMode: boolean;
  fps: number;
  cameraSource: string;
  systemStats: SystemStats;
}

const CameraViewport = ({
  pedestrians,
  activeCamera,
  debugMode,
  fps,
  cameraSource,
  systemStats
}: CameraViewportProps) => (
  <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl mb-6">
    <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg font-semibold z-10">
      {activeCamera === 'front' ? '前方鏡頭' : '後方鏡頭'}
      {debugMode && <span className="ml-2 text-xs text-green-400">● LIVE</span>}
    </div>

    {debugMode && (
      <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-mono z-10 space-y-1">
        <div>FPS: {fps}</div>
        <div>延遲: {systemStats.latency.toFixed(0)}ms</div>
        <div>來源: {cameraSource}</div>
      </div>
    )}

    <div className="relative w-full aspect-video bg-gradient-to-b from-gray-700 to-gray-600">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-1 bg-yellow-400/30" />
            ))}
          </div>

          {pedestrians.map(ped => {
            const distance = computeDistanceCm(ped);
            const size = distance <= 35 ? 18 : distance <= 45 ? 14 : 10;
            const isClose = distance <= 35;
            const isMedium = distance > 35 && distance <= 45;
            const boxColor = isClose
              ? 'border-red-500 shadow-red-500/50'
              : isMedium
              ? 'border-yellow-500 shadow-yellow-500/50'
              : 'border-green-400 shadow-green-400/50';
            const cornerColor = isClose ? 'bg-red-500' : isMedium ? 'bg-yellow-500' : 'bg-green-400';
            const textColor = cornerColor;
            const iconColor = isClose ? 'text-red-500' : isMedium ? 'text-yellow-500' : 'text-green-400';

            return (
              <div
                key={ped.id}
                className="absolute transition-all duration-75 ease-linear"
                style={{
                  left: `${ped.x}%`,
                  top: `${ped.y}%`,
                  width: `${size}%`,
                  height: `${size * 2}%`
                }}
              >
                <div className={`relative w-full h-full border-[3px] ${boxColor} rounded-lg shadow-lg`}>
                  <div className={`absolute -top-1 -left-1 w-3 h-3 ${cornerColor}`} />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 ${cornerColor}`} />
                  <div className={`absolute -bottom-1 -left-1 w-3 h-3 ${cornerColor}`} />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${cornerColor}`} />

                  <div className={`absolute inset-0 flex items-center justify-center ${iconColor}`}>
                    <Users className="w-full h-full p-2" />
                  </div>
                </div>

                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 ${textColor} text-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap`}>
                  {distance.toFixed(1)}cm
                </div>

                {debugMode && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono whitespace-nowrap">
                    ID:{ped.id} | 信心:{ped.confidence.toFixed(1)}% | 時長:{ped.trackingTime.toFixed(1)}s
                  </div>
                )}

                {isClose && !debugMode && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap animate-pulse">
                    ⚠️ 危險
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  </div>
);

export default CameraViewport;
