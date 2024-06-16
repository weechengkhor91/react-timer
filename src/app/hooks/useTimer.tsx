'use client'

import { useState, useEffect, useRef } from "react";

type TimerType = "work" | "break";

const WORK_TIME = 5; // 25 * 60
const BREAK_TIME = 3; // 5 * 60

const useTimer = (onClose: () => void) => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isStart, setIsStart] = useState(false);
  const [timerType, setTimerType] = useState<TimerType>("work");
  const [counterCycle, setCounterCycle] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const notificationAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      notificationAudio.current = new Audio('ringtone-001.mp3');
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isStart) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer as NodeJS.Timeout);
            if (timerType === "work") {
              setShowModal(true);
              setIsStart(false);
            } else {
              setShowModal(true);
              setIsStart(false);
              setTimerType("work");
              setTimeLeft(WORK_TIME);
            }
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isStart, timerType]);

  useEffect(() => {
    if (showModal && notificationAudio.current) {
      notificationAudio.current.play().catch(error => {
        console.error("Failed to play notification sound:", error);
      });
    }
  }, [showModal]);

  const startTimer = () => setIsStart(true);
  const stopTimer = () => setIsStart(false);
  const resetTimer = () => {
    setIsStart(false);
    setTimeLeft(timerType === "work" ? WORK_TIME : BREAK_TIME);
  };

  const handleTakeBreak = () => {
    if (notificationAudio.current) {
      notificationAudio.current.pause();
      notificationAudio.current.currentTime = 0;
    }
    setTimerType("break");
    setTimeLeft(BREAK_TIME);
    setIsStart(true);
    setShowModal(false);
    onClose();
  };

  const handleContinueWork = () => {
    if (notificationAudio.current) {
      notificationAudio.current.pause();
      notificationAudio.current.currentTime = 0;
    }
    setShowModal(false);
    onClose();
    resetTimer();
  };

  return {
    timeLeft,
    isStart,
    timerType,
    startTimer,
    stopTimer,
    resetTimer,
    counterCycle,
    showModal,
    handleTakeBreak,
    handleContinueWork
  };
};

export default useTimer;
