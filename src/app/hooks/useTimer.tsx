'use client'                                                                                                         
                                                                                                                      
 import { useState, useEffect, useRef } from "react";                                                                         
                                                                                                                      
 const notificationAudio = useRef<HTMLAudioElement | null>(null);                                                            
                                                                                                                      
 type TimerType = "work" | "break";                                                                                   
                                                                                                                      
 const WORK_TIME = 5; //25*60                                                                                         
 const BREAK_TIME = 3; //5*60                                                                                         
 const useTimer = () => {                                                                                             
   const [timeLeft, setTimeLeft] = useState(WORK_TIME); // 25 minutes in seconds                                      
   const [isStart, setIsStart] = useState(false);                                                                     
   const [timerType, setTimerType] = useState<TimerType>("work");                                                     
   const [counterCycle, setCounterCycle] = useState(0);                                                               
   const [showModal, setShowModal] = useState(false);                                                                 
                                                                                                                      
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
               setShowModal(true);                                                                                    
               if (typeof window !== 'undefined' && notificationAudio.current) {
                 notificationAudio.current.play().catch(error => {                                                              
                   console.error("Failed to play notification sound:", error);                                                                                                                         
                 });                                                                                                    
               }
             } else {                                                                                                 
               setTimerType("work");                                                                                  
               setTimeLeft(WORK_TIME);                                                                                
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
     setTimeLeft(timerType === "work" ? WORK_TIME : BREAK_TIME);                                                      
   };                                                                                                                 
                                                                                                                      
   const handleTakeBreak = () => {                                                                                    
     setShowModal(false);                                                                                             
     setTimerType("break");                                                                                           
     setTimeLeft(BREAK_TIME);                                                                                         
     setIsStart(true);                                                                                                
   };                                                                                                                 
                                                                                                                      
   const handleContinueWork = () => {                                                                                 
     setShowModal(false);                                                                                             
     resetTimer();                                                                                                    
   };                                                                                                                 
                                                                                                                      
   return { timeLeft, isStart, timerType, startTimer, stopTimer, resetTimer, setIsStart, counterCycle, showModal,     
 handleTakeBreak, handleContinueWork };                                                                               
 };                                                                                                                   
                                                                                                                      
 export default useTimer;    
