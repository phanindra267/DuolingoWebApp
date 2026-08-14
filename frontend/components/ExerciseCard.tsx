"use client";

import { useState, useEffect } from "react";
import { Exercise } from "@/lib/api";

export default function ExerciseCard({ exercise, onAnswer }: { exercise: Exercise; onAnswer: (correct: boolean) => void }) {
  const [shake, setShake] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [builtAnswer, setBuiltAnswer] = useState<string[]>([]);
  
  useEffect(() => {
    setTypedAnswer("");
    setSelectedOption(null);
    setBuiltAnswer([]);
  }, [exercise]);

  let content = { question: "", prompt: "", sentence: "", options: [] as string[], word_bank: [] as string[] };
  let answer = { correct: "" as string | string[] };
  
  try {
    content = JSON.parse(exercise.content_json);
    answer = JSON.parse(exercise.answer_json);
  } catch (e) {
    console.error("Parse error", e);
  }

  const checkAnswer = () => {
    let isCorrect = false;
    
    if (exercise.type === "multiple_choice") {
      isCorrect = selectedOption === answer.correct;
    } else if (exercise.type === "translate") {
      const builtStr = builtAnswer.join(" ");
      isCorrect = Array.isArray(answer.correct) 
        ? answer.correct.includes(builtStr) 
        : builtStr === answer.correct;
    } else if (exercise.type === "fill_blank") {
      isCorrect = typedAnswer.trim().toLowerCase() === (answer.correct as string).toLowerCase();
    } else if (exercise.type === "typing") {
      isCorrect = typedAnswer.trim().toLowerCase() === (answer.correct as string).toLowerCase();
    }
    
    if (isCorrect) {
      onAnswer(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      onAnswer(false);
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto p-6 min-h-[50vh] flex flex-col justify-between slide-in ${shake ? 'shake' : ''}`}>
      <div className="flex-1">
        <h2 className="text-3xl font-black mb-8">
          {exercise.type === "multiple_choice" && content.question}
          {exercise.type === "translate" && content.prompt}
          {exercise.type === "fill_blank" && "Fill in the blank"}
          {exercise.type === "typing" && content.question}
        </h2>
        
        {exercise.type === "multiple_choice" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.options?.map((opt) => (
              <button 
                key={opt}
                onClick={() => setSelectedOption(opt)}
                className={`p-4 rounded-xl border-2 text-left font-bold text-lg transition-all ${
                  selectedOption === opt 
                    ? 'border-[var(--duo-blue)] bg-[var(--duo-blue)]/20 text-[var(--duo-blue)]' 
                    : 'border-gray-600 hover:bg-gray-800'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {exercise.type === "translate" && (
          <div className="flex flex-col gap-8">
            <div className="min-h-[60px] border-b-2 border-gray-600 flex flex-wrap gap-2 pb-2">
              {builtAnswer.map((word, i) => (
                <button 
                  key={i} 
                  onClick={() => setBuiltAnswer(builtAnswer.filter((_, idx) => idx !== i))}
                  className="px-4 py-2 bg-gray-700 rounded-lg font-bold hover:bg-gray-600 shadow-[0_2px_0_#4b5563]"
                >
                  {word}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {content.word_bank?.filter((w) => !builtAnswer.includes(w)).map((word) => (
                <button 
                  key={word}
                  onClick={() => setBuiltAnswer([...builtAnswer, word])}
                  className="px-4 py-2 bg-[var(--bg-card)] border-2 border-gray-600 rounded-lg font-bold hover:bg-gray-800 shadow-[0_2px_0_#4b5563]"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {(exercise.type === "typing" || exercise.type === "fill_blank") && (
          <div className="flex flex-col gap-4">
            {exercise.type === "fill_blank" && <p className="text-xl mb-4 font-bold">{content.sentence}</p>}
            <input 
              type="text" 
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              className="w-full bg-[var(--bg-card)] border-2 border-gray-600 rounded-xl p-4 text-xl font-bold text-white focus:border-[var(--duo-blue)] outline-none"
              placeholder="Type your answer here..."
              autoFocus
            />
          </div>
        )}
      </div>

      <div className="pt-8 mb-24">
        <button 
          onClick={checkAnswer}
          className="btn-duo w-full py-4 text-xl uppercase tracking-widest"
        >
          Check
        </button>
      </div>
    </div>
  );
}
