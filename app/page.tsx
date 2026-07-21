"use client";

import {useState} from "react";

export default function Home() {
  const[screen, setScreen] = useState<"menu" | "study">("menu");

  if (screen == "menu") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-zinc-50">
        <h1 className="text-4xl font-semibold">StepProfessor</h1>
        <p className="text-zinc-600 max-w-md text-center">
          Your Virtual Tutor to help guide you with schoolwork.
          Upload your homework, practice tests, or other document to get a step-by-step walkthrough. :D
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
        <h2 className="font-medium">Upload your problem</h2>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500">Upload area goes here next</p>
      </div>
    </div>
  );
}