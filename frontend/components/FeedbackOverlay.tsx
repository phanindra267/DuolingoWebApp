"use client";
export default function FeedbackOverlay({ show, correct, onContinue }: { show: boolean; correct: boolean; onContinue: () => void }) {
  if (!show) return null;
  
  const bg = correct ? "bg-[var(--duo-green)]" : "bg-[var(--duo-red)]";
  const icon = correct ? "✓" : "✗";
  const text = correct ? "Excellent!" : "Not quite!";

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${bg} text-white p-6 pb-8 transform transition-transform z-50`}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center text-4xl font-bold">
            {icon}
          </div>
          <h2 className="text-3xl font-black">{text}</h2>
        </div>
        <button 
          onClick={onContinue}
          className="bg-white text-gray-900 font-bold uppercase tracking-widest px-12 py-4 rounded-xl text-xl hover:bg-gray-100 transition-colors shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-none"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
