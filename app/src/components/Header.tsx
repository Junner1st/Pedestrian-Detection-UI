import { Camera, Code, Users } from 'lucide-react';

interface HeaderProps {
  pedestrianCount: number;
  debugMode: boolean;
  onToggleDebug: () => void;
}

const Header = ({ pedestrianCount, debugMode, onToggleDebug }: HeaderProps) => (
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
      <Camera className="w-8 h-8" />
      行人偵測系統
    </h1>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-white">
        <Users className="w-5 h-5" />
        <span className="text-lg">偵測到 {pedestrianCount} 位行人</span>
      </div>
      <button
        onClick={onToggleDebug}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
          debugMode
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        <Code className="w-5 h-5" />
        {debugMode ? '開發者模式' : '一般模式'}
      </button>
    </div>
  </div>
);

export default Header;
