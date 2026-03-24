import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-slate-800/30 rounded-[2rem] border border-slate-700/50 overflow-hidden mb-6 hover:border-emerald-500/20 transition-all duration-500">
      <div className="p-6 md:p-10">
        <div className="flex items-start gap-4 mb-8">
          <div className="bg-slate-800 p-3 rounded-2xl text-slate-500 shrink-0 border border-slate-700 shadow-md">
            <HelpCircle size={20} />
          </div>
          <div className="flex-1">
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] block mb-1">
              PROMPT {index + 1}
            </span>
            <h4 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">
              {question.question}
            </h4>
          </div>
        </div>

        <div className="space-y-2 mb-8 md:pl-14">
          {question.options.map((option, idx) => {
            const isCorrect = showAnswer && option.trim().startsWith(question.answer);
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all duration-500 ${
                  isCorrect
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-slate-800 bg-slate-800/20"
                }`}
              >
                <p
                  className={`text-sm md:text-base font-semibold ${
                    isCorrect ? "text-emerald-400" : "text-slate-400"
                  }`}
                >
                  {option}
                </p>
              </div>
            );
          })}
        </div>

        <div className="md:pl-14">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={`btn h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
              showAnswer
                ? "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                : "btn-primary"
            }`}
          >
            {showAnswer ? (
              <>
                <ChevronUp size={16} /> Hide
              </>
            ) : (
              <>
                <ChevronDown size={16} /> Show Answer
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-8 md:ml-14 p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 relative">
                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                  <div className="bg-emerald-500 p-1.5 rounded-lg text-slate-900">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-sm font-black uppercase tracking-tight">
                    Key: {question.answer}
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="bg-emerald-500/20 p-1.5 rounded-lg shrink-0 h-fit">
                    <Info className="text-emerald-400" size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest block mb-1">
                      Explanation
                    </span>
                    <p className="text-slate-300 text-sm md:text-base font-medium italic leading-relaxed">
                      {question.explanation.replace(/>\s*/, "")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuestionCard;
