
import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Feedback: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="container py-20 max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-emerald-500 font-bold tracking-widest no-underline mb-12 hover:translate-x-[-4px] transition-transform uppercase text-xs"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[3rem] p-10 md:p-16 shadow-2xl"
        >
          <div className="bg-emerald-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 text-emerald-500">
            <MessageSquare size={40} />
          </div>

          <h1 className="text-4xl font-black mb-6 tracking-tight">Connect with Jaffar</h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">
            Thank you for using this study hub. I'm always looking to improve these modules and help the community better. If you have suggestions, corrections, or just want to discuss AWS concepts, please reach out!
          </p>

          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex items-center gap-6 group hover:border-emerald-500/30 transition-all">
              <div className="bg-emerald-500/10 p-4 rounded-xl text-emerald-500">
                <Mail size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Direct Email</span>
                <a 
                  href="mailto:jaafar.ali.in@gmail.com" 
                  className="text-xl font-bold text-white no-underline hover:text-emerald-400 transition-colors"
                >
                  jaafar.ali.in@gmail.com
                </a>
              </div>
            </div>

            <a 
              href="mailto:jaafar.ali.in@gmail.com"
              className="btn btn-primary w-full h-16 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/10 flex items-center justify-center gap-3 no-underline mt-10"
            >
              Send Message
              <Send size={20} />
            </a>
          </div>
        </motion.div>

        <p className="text-center mt-12 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
          Response time typically within 24-48 hours.
        </p>
      </div>
    </div>
  );
};

export default Feedback;
