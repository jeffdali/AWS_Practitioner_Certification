import React from "react";
import examsData from "../exams.json";
import { Exam } from "../types";
import { motion } from "framer-motion";
import { FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const exams = examsData as Exam[];

const Exams: React.FC = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen">
      <section className="container pt-12 pb-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 text-emerald-500 font-bold text-xs uppercase tracking-[0.2em]"
          >
            <FileText size={16} />
            Practice Assessments
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6 mt-2 leading-tight">
            Exam <span className="text-emerald-500">Samples</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Test your knowledge with real-style AWS Certified Cloud Practitioner questions. 
            Each exam provides instant feedback and detailed explanations to help you prepare.
          </p>
        </div>
      </section>

      <section className="pb-20 container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link 
                to={`/exam/${exam.id}`}
                className="block h-full no-underline p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ChevronRight className="text-emerald-500" size={20} />
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    <FileText size={20} />
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    Exam {index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {exam.title}
                </h3>
                
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  Topics: {exam.topics}
                </p>

                <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-2">
                  {exam.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800 group-hover:border-emerald-500/20">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {exam.questions.length} Questions
                  </span>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start Exam <ChevronRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Exams;
