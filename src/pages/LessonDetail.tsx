import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import lessonsData from "../lessons.json";
import QuestionCard from "../components/QuestionCard";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { Lesson } from "../types";

const lessons = lessonsData as Lesson[];

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"lesson" | "exam">("lesson");

  useEffect(() => {
    const found = lessons.find((l) => l.id === id);
    if (found) {
      setLesson(found);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!lesson) {
    return (
      <div className="container py-40 text-center">
        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
          Content Not Found
        </h2>
        <Link to="/" className="btn btn-primary no-underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40 bg-[#0f172a]">
      {/* Significantly Compact Header */}
      <div className="bg-slate-900 pt-12 pb-14 relative border-b border-slate-800">
        <div className="container relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-500 font-bold tracking-widest no-underline mb-6 hover:translate-x-[-4px] transition-transform uppercase text-[9px]"
          >
            <ArrowLeft size={14} />
            BACK
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-500 rounded text-[9px] font-bold uppercase tracking-tighter">
                {lesson.id}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight tracking-tight">
              {lesson.title.replace(/[\u1234-\uFFFF]|📘/, "").trim()}
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-slate-500 font-bold text-[9px] uppercase tracking-[0.2em]">
                <BookOpen size={14} className="text-emerald-500/50" />
                <span>15 Min</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-bold text-[9px] uppercase tracking-[0.2em]">
                <GraduationCap size={14} className="text-emerald-500/50" />
                <span>{lesson.questions.length} Questions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container -mt-6 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Controls */}
          <div className="tabs-container sticky top-20 z-[90] shadow-xl mb-10 h-14 p-1 bg-slate-900/95 border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("lesson")}
              className={`tab-btn flex items-center justify-center gap-2 text-[10px] ${
                activeTab === "lesson" ? "active" : ""
              }`}
            >
              <BookOpen size={16} />
              LESSON
            </button>
            <button
              onClick={() => setActiveTab("exam")}
              className={`tab-btn flex items-center justify-center gap-2 text-[10px] ${
                activeTab === "exam" ? "active" : ""
              }`}
            >
              <GraduationCap size={16} />
              QUESTIONS
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "lesson" ? (
              <motion.div
                key="lesson-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/50 backdrop-blur rounded-[2rem] border border-slate-800 p-8 md:p-12 shadow-2xl"
              >
                <div className="prose prose-sm md:prose-base">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lesson.content}
                  </ReactMarkdown>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-white mb-1">
                      Ready to test?
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Validate your understanding of this module.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("exam")}
                    className="btn btn-primary h-14 px-8 rounded-xl text-sm shadow-xl shadow-emerald-500/10 group hover:scale-[1.02] transition-transform"
                  >
                    Start Questions
                    <ChevronRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="exam-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-10 text-center max-w-2xl mx-auto py-4">
                  <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                    Practice
                  </h2>
                </div>

                <div className="space-y-4">
                  {lesson.questions.map((q, index) => (
                    <QuestionCard key={index} question={q} index={index} />
                  ))}
                </div>

                <div className="mt-20 bg-emerald-600 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase">
                    Module Complete
                  </h3>
                  <p className="text-base text-emerald-900/70 mb-10 max-w-xl mx-auto font-bold">
                    You've finished this section. Ready for the next module?
                  </p>
                  <Link
                    to="/"
                    className="btn bg-slate-900 text-white hover:bg-slate-800 transition-all hover:scale-105 px-10 h-14 text-sm rounded-xl border-none font-bold uppercase tracking-widest"
                  >
                    Next Module
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <footer className="container py-12 border-t border-slate-800/50 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 Crafted by Jaffar Ali.</p>
          <div className="flex gap-8">
            <Link
              to="/feedback"
              className="hover:text-emerald-400 cursor-pointer transition-colors no-underline"
            >
              Feedback
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LessonDetail;
