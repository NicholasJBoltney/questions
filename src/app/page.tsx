"use client";

import { useState, useEffect, useCallback } from "react";

const STRINGS = [
  "What is your most cherished memory from childhood?",
  "If you could have dinner with any historical figure, who would it be?",
  "What is the most adventurous thing you've ever done?",
  "If you could travel anywhere in the world right now, where would you go?",
  "What is a skill you've always wanted to learn but haven't yet?",
  "What's the best piece of advice you've ever received?",
  "If you could have any superpower, what would it be?",
  "What's your favorite way to spend a rainy afternoon?",
  "What is the most beautiful place you have ever seen?",
  "If you could live in any era of history, which one would you choose?",
  "What's a book or movie that changed your perspective on life?",
  "What is your dream job, regardless of money or location?",
  "What's the most important quality you look for in a friend?",
  "If you could only eat one meal for the rest of your life, what would it be?",
  "What is something you are deeply passionate about?"
];

export default function Home() {
  const [currentString, setCurrentString] = useState<string | null>(null);
  const [remainingStrings, setRemainingStrings] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize strings on mount
  useEffect(() => {
    setRemainingStrings([...STRINGS]);
  }, []);

  const handleNext = useCallback(() => {
    if (remainingStrings.length === 0) {
      setIsFinished(true);
      setCurrentString(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingStrings.length);
    const selectedString = remainingStrings[randomIndex];
    
    // Remove the selected string from the list
    const newRemaining = remainingStrings.filter((_, index) => index !== randomIndex);
    
    setCurrentString(selectedString);
    setRemainingStrings(newRemaining);
    setHasStarted(true);

    if (newRemaining.length === 0 && remainingStrings.length === 1) {
      // This was the last one, the next click will trigger finished state
      // or we can just set isFinished when we click again?
      // Requirement: "when all strings have been displayed there needs to be a message that says no more questions and the next button is hidden"
    }
  }, [remainingStrings]);

  // Handle the logic for "when all strings have been displayed"
  const showNoMore = isFinished || (hasStarted && remainingStrings.length === 0 && currentString === null);

  return (
    <main>
      <div className="content-container">
        <div className="card">
          {!hasStarted ? (
            <div className="question-text">Ready to start?</div>
          ) : isFinished ? (
            <div className="no-more-text">No more questions</div>
          ) : (
            <>
              <div className="question-text">{currentString}</div>
              <div className="progress-text">
                {STRINGS.length - remainingStrings.length} of {STRINGS.length}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="footer">
        {!isFinished && (
          <button 
            className="next-button" 
            onClick={handleNext}
          >
            {hasStarted ? (remainingStrings.length > 0 ? "Next" : "Finish") : "Start"}
          </button>
        )}
      </div>
    </main>
  );
}
