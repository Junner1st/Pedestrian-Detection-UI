import { useState } from 'react';
import CameraSelector from './components/CameraSelector';
import CameraViewport from './components/CameraViewport';
import DebugPanel from './components/DebugPanel';
import Header from './components/Header';
import SystemBanner from './components/SystemBanner';
import { useSystemStats } from './hooks/useSystemStats';
import type { CameraView, Pedestrian } from './types/simulation';

const App = () => {
  const [activeCamera, setActiveCamera] = useState<CameraView>('front');
  const [debugMode, setDebugMode] = useState(false);
  const [aiModel, setAiModel] = useState('YOLOv8');
  const [cameraSource, setCameraSource] = useState('USB_CAM_0');
  const [fps, setFps] = useState(30);
  const [confidence, setConfidence] = useState(85);

  const systemStats = useSystemStats();
  const pedestrians: Pedestrian[] = [];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header
          pedestrianCount={0}
          debugMode={debugMode}
          onToggleDebug={() => setDebugMode(prev => !prev)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={debugMode ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <CameraSelector activeCamera={activeCamera} onSelect={setActiveCamera} />
            <CameraViewport
              activeCamera={activeCamera}
              debugMode={debugMode}
              fps={fps}
              cameraSource={cameraSource}
              systemStats={systemStats}
            />
            {!debugMode && <SystemBanner aiModel={aiModel} fps={fps} />}
          </div>

          {debugMode && (
            <DebugPanel
              systemStats={systemStats}
              aiModel={aiModel}
              onModelChange={setAiModel}
              confidence={confidence}
              onConfidenceChange={setConfidence}
              fps={fps}
              onFpsChange={setFps}
              cameraSource={cameraSource}
              onCameraSourceChange={setCameraSource}
              pedestrians={pedestrians}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;