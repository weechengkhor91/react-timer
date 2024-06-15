'use client'

import  { useState, useEffect } from "react";

type TimerType = "work" | "break";

const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isStart, setIsStart] = useState(false);
  const [timerType, setTimerType] = useState<TimerType>("work");
  const [counterCycle, setCounterCycle] = useState(0);

  
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    // timerType is break and timeLeft 0  - increment 1 
    if(timerType === 'break' && (timeLeft === 0 || !isStart)){
          setCounterCycle(prevCount => prevCount + 1);
      }

      // click start timer, isStart true
    if (isStart) {
      // setInterval 
      timer = setInterval(() => {
        // timing left
        setTimeLeft((prev) => {
          // timing equal 0
          if (prev === 0) {
            // change to timerType break
            if(timerType === 'work') {

              setTimerType("break");
              
              setTimeLeft(5 * 60);
              
            }else {
              setTimerType("work");
              setTimeLeft(25 * 60);

            }
            // stop after done work time and break time (1 cycle)
           if(timerType === 'break' && timeLeft === 0){
                setIsStart(false);
            }
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    //clear interval
    return () => { 
      if(timer) clearInterval(timer as NodeJS.Timeout); 
    };
  }, [isStart, timerType, timeLeft]);

  const startTimer = () => setIsStart(true);
  const stopTimer = () => setIsStart(false);
  const resetTimer = () => {
    setIsStart(false);
    setTimeLeft(timerType === "work" ? 25 * 60 : 5 * 60);
  };

  return { timeLeft, isStart, timerType, startTimer, stopTimer, resetTimer,  setIsStart, counterCycle };
};

export default useTimer;
