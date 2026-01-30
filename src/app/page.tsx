"use client";

import { useState, useEffect, useCallback } from "react";

const STRINGS = [
  "What are you grateful for right now?",
  " What is your favorite time of the day? Why?",
  "What food dish would you like to become great at making?",
  "Sunrise or sunset? Why?",
  "Sweet or savory breakfast? Why?",
  "What’s one thing we do together that helps you feel connected to me?",
  "What song instantly reminds you of me?",
  "What’s one memory of us that gives you instant butterflies?",
  "If we could teleport anywhere for a date, where would we go?",
  "When we’re apart, what’s the thing you find yourself missing first?",
  "What do you hope your life looks like in five years?",
  "What do you hope your life looks like in 50 years?",
  "Do you find it easy or hard to ask for help?",
  "How important is living near family to you?",
  "How does being around my family make you feel?",
  "When you’re feeling anxious, how can I be supportive?",
  "When was a time I made you feel especially appreciated?",
  "What’s something you think we do really well as a couple?",
  "What’s something small I do that makes a big difference to you?",
  "What’s a memory of us that still makes you laugh?",
  "What three words would you use to describe your childhood?",
  "What family member were you closest to growing up?",
  "Were you shy or outgoing as a kid?",
  "What book character did you identify with most as a kid?",
  "What was your favorite way to spend a Saturday as a kid?",
  "Who was your first best friend?",
  "Did you have a nickname growing up?",
  "What was your favorite subject in school as a kid?",
  "Would you rather live in the mountains or by the ocean?",
  "What’s your plan for the zombie apocalypse?",
  "If you won $100,000 tomorrow, what’s the first thing you’d buy?",
  "Would you rather be wealthy or intelligent?",
  "What’s one experience you’ve had that I haven’t, that you’d want me to get to have?",
  "How do you think will human life and society change in the span of 100 years?",
 "If you have to sacrifice 1 life to save 10 lives, would you do it?",
 "If our life was a reality TV series, what do you think would be the most appropriate title?",
 "If I was an animal, what would I be and why?",
 "If there was one daily task you could get rid of doing forever, what would it be?",
 "What is one food that you want to make into a fun family tradition?",
 "I am most likely to get famous for...",
 "What would our retirement life look like?",
 "In a regular day, what do you find yourself thinking about the most?",
 "What things in your life bring you the greatest pleasure?",
 "What are your favorite things to spend money on?",
 "What do you splurge on when you need to treat yourself?",
 "Do you like celebrating your birthday?",
 "What’s our secret code for when either of us wants to leave a party early?",
 "Are you a morning person?",
 "In a fight between me and thirty deranged ducks, who wins?",
 "Would you rather have to whisper everything or shout everything?",
 "Would you rather be able to speak to animals or speak every human language?",
 "Would you rather burp butterflies or fart glitter?"
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
