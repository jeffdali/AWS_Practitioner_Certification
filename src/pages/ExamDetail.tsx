import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import examsData from "../exams.json";
import { Exam, Question } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Trophy, 
  ArrowLeft,
  Info,
  FileText 
} from "lucide-react";

const exams = examsData as Exam[];

const ExamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const exam = exams.find((e) => e.id === id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExamStarted, setIsExamStarted] = useState(false);

  useEffect(() => {
    if (exam && isExamStarted) {
      // Pace: ~85 seconds per question
      setTimeLeft(exam.questions.length * 85);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [exam, isExamStarted]);

  if (!exam) return <div>Exam not found</div>;

  const currentQuestion = exam.questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (showResults) return;

    const optionKey = option.charAt(0); // Assuming options are like "A) ..."
    const currentSelected = selectedAnswers[currentQuestionIndex] || [];
    
    if (currentQuestion.isMultiple) {
      // Find out how many answers are expected from the question text (often stated like "Select TWO")
      // For now, let's look at the answer length in the data or just toggle.
      // The answer string is usually "A, C" or "A, B, D"
      const expectedCount = currentQuestion.answer.split(",").length;
      
      if (currentSelected.includes(optionKey)) {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentQuestionIndex]: currentSelected.filter(a => a !== optionKey)
        });
      } else if (currentSelected.length < expectedCount) {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentQuestionIndex]: [...currentSelected, optionKey].sort()
        });
      }
    } else {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestionIndex]: [optionKey]
      });
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    exam.questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx] || [];
      const correct = q.answer.split(",").map(a => a.trim());
      
      if (selected.length === correct.length && selected.every(val => correct.includes(val))) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const handleSubmit = () => {
    calculateScore();
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const getResultColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-emerald-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white py-12 px-6">
        <div className="max-w-3xl mx-auto border border-slate-800 rounded-3xl p-8 bg-slate-900/50 backdrop-blur-sm">
          <Link to="/exams" className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest no-underline mb-8 hover:gap-3 transition-all">
            <ChevronLeft size={16} /> Back to Exams
          </Link>
          
          <h1 className="text-3xl font-black mb-4">{exam.title}</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            {exam.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
               <div className="text-emerald-500 font-black text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <FileText size={14} /> Question Count
               </div>
               <div className="text-2xl font-bold">{exam.questions.length} Items</div>
            </div>
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
               <div className="text-emerald-500 font-black text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <Clock size={14} /> Time Limit
               </div>
               <div className="text-2xl font-bold">{formatTime(exam.questions.length * 85)}</div>
            </div>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 mb-10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-emerald-500" size={20} />
              Instructions & Strategy
            </h3>
            <ul className="space-y-3 text-sm text-slate-400 list-none p-0">
               {["Real exam pace (~85s per question)", "Multiple response questions stated explicitly", "No penalty for guessing", "Instant results and detailed explanations"].map((item, i) => (
                 <li key={i} className="flex gap-3 leading-relaxed">
                   <div className="min-w-[6px] h-[6px] rounded-full bg-emerald-500 mt-2" />
                   {item}
                 </li>
               ))}
            </ul>
          </div>

          <button 
            onClick={() => setIsExamStarted(true)}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
          >
            Begin Exam
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="inline-block p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-4"
            >
              <Trophy size={48} />
            </motion.div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Exam Complete</h1>
            <p className="text-slate-400 uppercase tracking-widest font-bold text-xs uppercase">Review your performance below</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center">
               <div className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">Final Score</div>
               <div className={`text-5xl font-black ${getResultColor(score, exam.questions.length)}`}>
                 {score}/{exam.questions.length}
               </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center">
               <div className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">Percentage</div>
               <div className="text-5xl font-black text-white">
                 {Math.round((score / exam.questions.length) * 100)}%
               </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center">
               <div className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">Result</div>
               <div className={`text-3xl font-black uppercase tracking-widest mt-2 ${(score / exam.questions.length) >= 0.7 ? 'text-emerald-500' : 'text-red-500'}`}>
                 {(score / exam.questions.length) >= 0.7 ? "Passed" : "Failed"}
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-black text-white tracking-tight border-b border-slate-800 pb-4">Detailed Review</h2>
            {exam.questions.map((q, idx) => {
              const selected = selectedAnswers[idx] || [];
              const correct = q.answer.split(",").map(a => a.trim());
              const isCorrect = selected.length === correct.length && selected.every(val => correct.includes(val));
              
              return (
                <div key={idx} className={`p-8 rounded-3xl border ${isCorrect ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <h3 className="text-lg font-bold leading-relaxed">{idx + 1}. {q.question}</h3>
                    {isCorrect ? (
                      <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                        <CheckCircle2 size={14} /> Correct
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                        <AlertCircle size={14} /> Incorrect
                      </div>
                    )}
                  </div>
                  
                  <div className="grid gap-3 mb-6">
                    {q.options.map((opt, i) => {
                      const optKey = opt.charAt(0);
                      const isOptionSelected = selected.includes(optKey);
                      const isOptionCorrect = correct.includes(optKey);
                      
                      let optBg = "bg-slate-900 border-slate-800";
                      if (isOptionCorrect) optBg = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                      else if (isOptionSelected && !isOptionCorrect) optBg = "bg-red-500/10 border-red-500/30 text-red-400";

                      return (
                        <div key={i} className={`p-4 rounded-xl border text-sm transition-all ${optBg}`}>
                          {opt}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                    <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                      <Info size={14} /> Explanation
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed italic">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex gap-4">
            <button 
              onClick={() => {
                setIsExamStarted(false);
                setShowResults(false);
                setSelectedAnswers({});
                setCurrentQuestionIndex(0);
              }}
              className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all"
            >
              Retake Exam
            </button>
            <Link 
              to="/exams"
              className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl text-center no-underline transition-all"
            >
              Other Exams
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Exam Header */}
      <div className="sticky top-0 z-[101] bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 py-3">
        <div className="container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">
              {exam.title}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              Question {currentQuestionIndex + 1} of {exam.questions.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
              <Clock className="text-emerald-500" size={16} />
              <span className={`text-sm font-mono font-black ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <button 
              onClick={handleSubmit}
              className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/20 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            >
              End Exam
            </button>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-4xl">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-800 rounded-full mb-12 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / exam.questions.length) * 100}%` }}
            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12"
          >
            {currentQuestion.isMultiple && (
              <div className="inline-flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full mb-8">
                <AlertCircle size={14} /> Select {currentQuestion.answer.split(",").length} Correct Answers
              </div>
            )}

            <h2 className="text-xl md:text-2xl font-bold text-white mb-10 leading-relaxed ">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-4">
              {currentQuestion.options.map((option, idx) => {
                const optKey = option.charAt(0);
                const isSelected = (selectedAnswers[currentQuestionIndex] || []).includes(optKey);
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full group relative flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 text-left ${
                      isSelected 
                        ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]' 
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-500/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${
                      isSelected ? 'bg-white text-emerald-600' : 'bg-slate-900 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                    }`}>
                      {optKey}
                    </div>
                    <span className={`text-sm md:text-base font-medium transition-colors ${
                      isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {option.substring(3)}
                    </span>
                    {isSelected && (
                       <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                       >
                         <CheckCircle2 size={16} className="text-white" />
                       </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-12">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-slate-500 border border-slate-800 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeft size={18} /> Previous
          </button>
          
          <div className="hidden md:flex gap-2">
            {exam.questions.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentQuestionIndex ? 'bg-emerald-500 w-8' : 'bg-slate-800 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (currentQuestionIndex === exam.questions.length - 1) {
                handleSubmit();
              } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }
            }}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            {currentQuestionIndex === exam.questions.length - 1 ? 'Finish Exam' : 'Next Question'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;

