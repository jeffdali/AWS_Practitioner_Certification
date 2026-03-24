import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Book, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Lesson } from "../types";

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, index }) => {
  const lessonNumber = lesson.id.split("-")[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="glass-card hover:border-emerald-500/30 transition-all duration-300 group flex flex-col h-full"
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500">
            <Book size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Module {lessonNumber}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight group-hover:text-emerald-400 transition-colors">
            {lesson.title.replace(/[\u1234-\uFFFF]|📘/, "").trim()}
          </h3>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            <Clock size={12} className="text-emerald-500/50" />
            <span>15min</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            <Book size={12} className="text-emerald-500/50" />
            <span>{lesson.questions.length} Questions</span>
          </div>
        </div>

        <Link
          to={`/lesson/${lesson.id}`}
          className="btn btn-primary w-full py-3.5 text-xs uppercase tracking-widest mt-8 no-underline font-black"
        >
          View Lesson
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default LessonCard;
