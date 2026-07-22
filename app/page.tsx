"use client";

import { useState } from "react";

type Step = {
  id: string;
  correctAnswer: string;
  options: string[];
};

type Problem = {
  statement: string;
  steps: Step[];
};

// Fake hardcoded data to first test with to see if all the ui works
// API call later
const FAKE_PROBLEM: Problem = {
  statement: "Solve for x: 2x + 4 = 10",
  steps: [
    {
      id: "step1",
      correctAnswer: "Subtract 4 from both sides",
      options: [
        "Subtract 4 from both sides",
        "Divide both sides by 2 first",
        "Add 4 to both sides",
        "Multiply both sides by 2",
      ],
    },
    {
      id: "step2",
      correctAnswer: "Divide both sides by 2",
      options: [
        "Divide both sides by 2",
        "Subtract 2 from both sides",
        "Square both sides",
        "Add 6 to both sides",
      ],
    },
  ],
};

export default function Home() {
  const [screen, setScreen] = useState<"menu" | "study">("menu");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleUpload() {
    // Fake "AI extracted this problem" — real version will call the API
    setProblem(FAKE_PROBLEM);
    setCurrentStepIndex(0);
    setFeedback(null);
  }

  function handleOptionClick(option: string) {
    const correct = problem?.steps[currentStepIndex].correctAnswer;
    if (option === correct) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
  }

  function handleNextStep() {
    setFeedback(null);
    setCurrentStepIndex((i) => i + 1);
  }

  if (screen === "menu") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-zinc-50">
        <h1 className="text-4xl font-semibold">StepProfessor</h1>
        <p className="text-zinc-600 max-w-md text-center">
          Upload your homework, practice tests, or notes — get a step-by-step
          walkthrough without the answer just handed to you.
        </p>
        <button
          onClick={() => setScreen("study")}
          className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-zinc-800 transition"
        >
          Start Studying
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <header className="p-4 border-b bg-white flex items-center gap-3">
        <button
          onClick={() => setScreen("menu")}
          className="text-zinc-500 hover:text-black"
        >
          ← Back
        </button>
        <h2 className="font-medium">Study Session</h2>
      </header>

      <div className="flex-1 flex flex-col items-center p-6 gap-4 max-w-xl mx-auto w-full">
        {!problem && (
          <div className="flex flex-col items-center gap-4 mt-20">
            <p className="text-zinc-500 text-center">
              Upload a photo of your homework, practice test, or notes to get
              started.
            </p>
            <button
              onClick={handleUpload}
              className="border-2 border-dashed border-zinc-300 rounded-xl px-10 py-8 text-zinc-400 hover:border-zinc-400 hover:text-zinc-500 transition"
            >
              📷 Tap to upload a photo
            </button>
          </div>
        )}

        {problem && (
          <div className="w-full flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm self-start max-w-[85%]">
              <p className="text-sm text-zinc-400 mb-1">Problem</p>
              <p>{problem.statement}</p>
            </div>

            {currentStepIndex < problem.steps.length ? (
              <div className="bg-white rounded-2xl p-4 shadow-sm self-start max-w-[85%]">
                <p className="text-sm text-zinc-400 mb-2">
                  What's the next step?
                </p>
                <div className="flex flex-col gap-2">
                  {problem.steps[currentStepIndex].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      disabled={feedback !== null}
                      className="text-left border rounded-lg px-4 py-2 hover:bg-zinc-50 disabled:opacity-50"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {feedback === "correct" && (
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-green-600 font-medium">
                      ✓ Correct! Now show your work.
                    </p>
                    <button
                      onClick={handleNextStep}
                      className="text-sm bg-black text-white px-3 py-1.5 rounded-full"
                    >
                      Continue
                    </button>
                  </div>
                )}
                {feedback === "incorrect" && (
                  <p className="mt-3 text-red-600 font-medium">
                    ✗ Not quite — try again.
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-4 shadow-sm self-start max-w-[85%]">
                <p className="text-green-600 font-medium">
                  🎉 You solved it! Great work.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}