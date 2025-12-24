import { Activity, Cpu, Monitor } from 'lucide-react';
import type { Pedestrian, SystemStats } from '../types/simulation';
import { computeDistanceCm } from '../utils/danger';

interface DebugPanelProps {
  systemStats: SystemStats;
  aiModel: string;
  onModelChange: (model: string) => void;
  confidence: number;
  onConfidenceChange: (value: number) => void;
  fps: number;
  onFpsChange: (value: number) => void;
  cameraSource: string;
  onCameraSourceChange: (value: string) => void;
  pedestrians: Pedestrian[];
}

const DebugPanel = ({
  systemStats,
  aiModel,
  onModelChange,
  confidence,
  onConfidenceChange,
  fps,
  onFpsChange,
  cameraSource,
  onCameraSourceChange,
  pedestrians
}: DebugPanelProps) => (
  <div className="lg:col-span-1 space-y-6">
    <section className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        系統狀態
      </h3>
      <div className="space-y-3">
        <StatBar label="CPU 使用率" value={`${systemStats.cpu.toFixed(1)}%`} percentage={systemStats.cpu} color="bg-blue-500" />
        <StatBar label="GPU 使用率" value={`${systemStats.gpu.toFixed(1)}%`} percentage={systemStats.gpu} color="bg-green-500" />
        <StatBar label="記憶體使用" value={`${systemStats.memory.toFixed(2)} GB`} percentage={(systemStats.memory / 4) * 100} color="bg-purple-500" />
        <div className="pt-2 border-t border-gray-700 flex justify-between text-sm">
          <span className="text-gray-400">推論延遲</span>
          <span className="text-green-400 font-mono">{systemStats.latency.toFixed(0)} ms</span>
        </div>
      </div>
    </section>

    <section className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        <Cpu className="w-5 h-5" />
        AI 模型設定
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm mb-2 block">偵測模型</label>
          <select
            value={aiModel}
            onChange={event => onModelChange(event.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="YOLOv8">YOLOv8 (推薦)</option>
            <option value="YOLOv7">YOLOv7</option>
            <option value="YOLOv5">YOLOv5</option>
            <option value="SSD">SSD MobileNet</option>
            <option value="Faster-RCNN">Faster R-CNN</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">信心度閾值: {confidence}%</label>
          <input
            type="range"
            min={50}
            max={95}
            value={confidence}
            onChange={event => onConfidenceChange(Number(event.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">目標 FPS: {fps}</label>
          <input
            type="range"
            min={15}
            max={60}
            step={5}
            value={fps}
            onChange={event => onFpsChange(Number(event.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </section>

    <section className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        <Monitor className="w-5 h-5" />
        鏡頭來源
      </h3>
      <div className="space-y-3">
        <div>
          <label className="text-gray-400 text-sm mb-2 block">前方鏡頭</label>
          <select
            value={cameraSource}
            onChange={event => onCameraSourceChange(event.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
          >
            <option value="USB_CAM_0">USB Camera 0</option>
            <option value="USB_CAM_1">USB Camera 1</option>
            <option value="IP_CAM_192">IP Camera (192.168.1.100)</option>
            <option value="IP_CAM_101">IP Camera (192.168.1.101)</option>
            <option value="RTSP_STREAM">RTSP Stream</option>
            <option value="FILE_VIDEO">檔案輸入</option>
          </select>
        </div>
        <div className="pt-2">
          <label className="text-gray-400 text-sm mb-2 block">解析度</label>
          <select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm">
            <option value="1920x1080">1920 x 1080 (Full HD)</option>
            <option value="1280x720">1280 x 720 (HD)</option>
            <option value="640x480">640 x 480 (VGA)</option>
          </select>
        </div>
      </div>
    </section>

    <section className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-bold mb-4">偵測物件列表</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {pedestrians.length ? (
          pedestrians.map(ped => {
            const distance = computeDistanceCm(ped);
            const badgeColor = distance <= 35 ? 'bg-red-500' : distance <= 45 ? 'bg-yellow-500' : 'bg-green-500';

            return (
              <div key={ped.id} className="bg-gray-700 rounded-lg p-3 text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-semibold">ID: {ped.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${badgeColor} text-white`}>
                    {distance.toFixed(1)} cm
                  </span>
                </div>
                <div className="text-gray-400 text-xs space-y-0.5 font-mono">
                  <div>信心度: {ped.confidence.toFixed(1)}%</div>
                  <div>座標: ({ped.x.toFixed(1)}, {ped.y.toFixed(1)})</div>
                  <div>追蹤: {ped.trackingTime.toFixed(1)}s</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center py-4">目前無偵測物件</div>
        )}
      </div>
    </section>
  </div>
);

interface StatBarProps {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

const StatBar = ({ label, value, percentage, color }: StatBarProps) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-mono">{value}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${Math.min(percentage, 100)}%` }} />
    </div>
  </div>
);

export default DebugPanel;
