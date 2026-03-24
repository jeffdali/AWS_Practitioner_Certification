import React from "react";
import lessonsData from "../lessons.json";
import LessonCard from "../components/LessonCard";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Lesson } from "../types";
import { Link } from "react-router-dom";

const lessons = lessonsData as Lesson[];

const Home: React.FC = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen">
      {/* Significantly Reduced Hero Section */}
      <section className="container pt-12 pb-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 text-emerald-500 font-bold text-xs uppercase tracking-[0.2em]"
          >
            <BookOpen size={16} />
            Community Resource
          </motion.div>
        </div>
      </section>

      {/* Learning Path - Main Curriculum displayed immediately */}
      <section id="curriculum" className="pb-20 container">
        <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white tracking-[0.1em] uppercase flex items-center gap-3">
            Curriculum Path
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              {lessons.length} Modules
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {lessons.map((lesson, index) => (
            <LessonCard key={lesson.id} lesson={lesson} index={index} />
          ))}
        </div>
      </section>

      {/* Simplified Footer */}
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

export default Home;
