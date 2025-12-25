import { useEffect, useMemo, useRef } from 'react';
import type { CameraView, SystemStats } from '../types/simulation';

interface CameraViewportProps {
  activeCamera: CameraView;
  debugMode: boolean;
  fps: number;
  cameraSource: string;
  systemStats: SystemStats;
}

const CameraViewport = ({
  activeCamera,
  debugMode,
  fps,
  cameraSource,
  systemStats
}: CameraViewportProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoSources = useMemo(
    () => ({
      front: import.meta.env.VITE_FRONT_SOURCE ?? '',
      rear: import.meta.env.VITE_BACK_SOURCE ?? ''
    }),
    []
  );

  const activeVideoSrc = videoSources[activeCamera];

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !activeVideoSrc) {
      return;
    }

    element.src = activeVideoSrc;

    const handleReady = () => {
      element.currentTime = 0;
      const playPromise = element.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          /* Autoplay might be blocked; ignore silently. */
        });
      }
    };

    element.addEventListener('loadedmetadata', handleReady, { once: true });

    if (element.readyState >= 1) {
      handleReady();
    }

    return () => {
      element.removeEventListener('loadedmetadata', handleReady);
    };
  }, [activeCamera, activeVideoSrc]);

  return (
    <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl mb-6">
      <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg font-semibold z-20">
        {activeCamera === 'front' ? '前方鏡頭' : '後方鏡頭'}
        {debugMode && <span className="ml-2 text-xs text-green-400">● LIVE</span>}
      </div>

      {debugMode && (
        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-mono z-20 space-y-1">
          <div>FPS: {fps}</div>
          <div>延遲: {systemStats.latency.toFixed(0)}ms</div>
          <div>來源: {cameraSource}</div>
        </div>
      )}

      <div className="relative w-full aspect-video bg-gradient-to-b from-gray-700 to-gray-600">
        {activeVideoSrc ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-sm">
            無法載入影像來源，請確認 `.env` 設定。
          </div>
        )}

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
};

export default CameraViewport;
