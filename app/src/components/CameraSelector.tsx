import type { CameraView } from '../types/simulation';

interface CameraSelectorProps {
  activeCamera: CameraView;
  onSelect: (camera: CameraView) => void;
}

const CameraSelector = ({ activeCamera, onSelect }: CameraSelectorProps) => (
  <div className="flex gap-4 mb-6">
    <button
      onClick={() => onSelect('front')}
      className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
        activeCamera === 'front'
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      🚗 車頭鏡頭
    </button>
    <button
      onClick={() => onSelect('rear')}
      className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
        activeCamera === 'rear'
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      🚙 車尾鏡頭
    </button>
  </div>
);

export default CameraSelector;
