export default function ProgressBar({ value, color = 'bg-[var(--duo-green)]' }: { value: number; color?: string }) {
  return (
    <div className="w-full h-4 bg-gray-200/20 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-300 ease-out`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
