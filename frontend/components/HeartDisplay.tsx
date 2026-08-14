"use client";

export default function HeartDisplay({ hearts }: { hearts: number }) {
  const maxHearts = 5;
  const heartsArray = Array.from({ length: maxHearts }, (_, i) => i < hearts);
  
  return (
    <div className="flex gap-1">
      {heartsArray.map((filled, i) => (
        <span key={i} className={`text-2xl transition-transform ${filled ? '' : 'opacity-30 scale-75'}`}>
          ❤️
        </span>
      ))}
    </div>
  );
}
