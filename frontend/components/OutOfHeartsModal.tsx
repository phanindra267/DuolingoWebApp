export default function OutOfHeartsModal({ onClose, onRefill }: { onClose: () => void, onRefill: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg-dark)] border-2 border-gray-700 rounded-3xl p-8 max-w-sm w-full text-center flex flex-col items-center shadow-2xl">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-black text-white mb-4">Out of Hearts!</h2>
        <p className="text-gray-400 font-bold mb-8">
          You made too many mistakes. Refill your hearts to keep learning!
        </p>
        
        <div className="flex flex-col gap-4 w-full">
          <button onClick={onRefill} className="btn-duo w-full">
            REFILL HEARTS (MOCK)
          </button>
          <button 
            onClick={onClose} 
            className="w-full font-bold text-gray-500 hover:text-gray-300 py-3 uppercase tracking-widest"
          >
            END SESSION
          </button>
        </div>
      </div>
    </div>
  );
}
