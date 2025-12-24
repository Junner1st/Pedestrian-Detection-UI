interface SystemBannerProps {
  aiModel: string;
  fps: number;
}

const SystemBanner = ({ aiModel, fps }: SystemBannerProps) => (
  <div className="mt-6 bg-gray-800 rounded-xl p-4 text-gray-300 text-sm">
    <div className="flex flex-wrap gap-2 justify-between">
      <span>系統狀態: ✓ 正常運作</span>
      <span>AI 模型: {aiModel}</span>
      <span>FPS: {fps}</span>
    </div>
  </div>
);

export default SystemBanner;
