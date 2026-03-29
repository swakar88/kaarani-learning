"use client";

import { useState, useEffect } from "react";
import { QuizQuestion } from "@/data/quizzes";

interface QuizSectionProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  moduleColor?: string;
}

export function QuizSection({
  questions,
  onComplete,
  moduleColor = "#2563EB",
}: QuizSectionProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    questions.map(() => null)
  );
  const allAnswered = answers.every((a) => a !== null);
  const score = answers.reduce<number>((acc, a, i) => {
    return a === questions[i].correctIndex ? acc + 1 : acc;
  }, 0);

  useEffect(() => {
    if (allAnswered) onComplete(score);
  }, [allAnswered]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {questions.map((q, qIdx) => {
        const chosen = answers[qIdx];
        const answered = chosen !== null;
        const isCorrect = chosen === q.correctIndex;

        return (
          <div
            key={q.id}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1.5px solid #E5E7EB" }}
          >
            {/* Question header */}
            <div
              className="px-4 py-3"
              style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}
            >
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: moduleColor }}>
                Question {qIdx + 1} of {questions.length}
              </p>
              <p className="text-sm font-semibold leading-snug" style={{ color: "#111827" }}>
                {q.question}
              </p>
            </div>

            {/* Options */}
            <div className="px-4 py-3 flex flex-col gap-2" style={{ backgroundColor: "#FFFFFF" }}>
              {q.options.map((opt, optIdx) => {
                const isChosen = chosen === optIdx;
                const isCorrectOpt = optIdx === q.correctIndex;
                let bg = "#FFFFFF";
                let borderColor = "#E5E7EB";
                let textColor = "#374151";
                let indicator = null;

                if (answered) {
                  if (isCorrectOpt) {
                    bg = "#F0FDF4";
                    borderColor = "#16A34A";
                    textColor = "#166534";
                    indicator = (
                      <span className="text-sm font-black" style={{ color: "#16A34A" }}>✓</span>
                    );
                  } else if (isChosen && !isCorrect) {
                    bg = "#FEF2F2";
                    borderColor = "#DC2626";
                    textColor = "#991B1B";
                    indicator = (
                      <span className="text-sm font-black" style={{ color: "#DC2626" }}>✗</span>
                    );
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={answered}
                    onClick={() => handleAnswer(qIdx, optIdx)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                    style={{
                      backgroundColor: bg,
                      border: `1.5px solid ${borderColor}`,
                      color: textColor,
                      cursor: answered ? "default" : "pointer",
                    }}
                  >
                    <span className="text-xs font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: answered && isCorrectOpt ? "#16A34A" : answered && isChosen ? "#DC2626" : moduleColor + "18",
                        color: answered && (isCorrectOpt || isChosen) ? "#FFFFFF" : moduleColor,
                      }}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm leading-snug flex-1">{opt}</span>
                    {indicator && <span>{indicator}</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation (shown after answering) */}
            {answered && (
              <div
                className="px-4 py-3"
                style={{
                  backgroundColor: isCorrect ? "#F0FDF4" : "#FFF7ED",
                  borderTop: `1px solid ${isCorrect ? "#BBF7D0" : "#FED7AA"}`,
                }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: isCorrect ? "#166534" : "#92400E" }}>
                  {isCorrect ? "Correct!" : "Not quite — here's why:"}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: isCorrect ? "#14532D" : "#78350F" }}>
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Score banner */}
      {allAnswered && (
        <div
          className="rounded-2xl px-5 py-4 flex items-center gap-4"
          style={{
            backgroundColor: score === questions.length ? "#F0FDF4" : score >= questions.length - 1 ? "#EFF6FF" : "#FFFBEB",
            border: `2px solid ${score === questions.length ? "#16A34A" : score >= questions.length - 1 ? "#2563EB" : "#F59E0B"}`,
          }}
        >
          <span className="text-3xl">{score === questions.length ? "" : score >= questions.length - 1 ? "" : ""}</span>
          <div>
            <p className="font-black text-lg" style={{ color: "#111827" }}>
              {score} / {questions.length} correct
            </p>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              {score === questions.length
                ? "Perfect score — you really know this."
                : score === questions.length - 1
                ? "Solid understanding. Check the explanation on the one you missed."
                : "Review the explanations above — the Try Yourself tasks will make it click."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
