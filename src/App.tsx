import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LessonDetail from "./pages/LessonDetail";
import Feedback from "./pages/Feedback";
import Exams from "./pages/Exams";
import ExamDetail from "./pages/ExamDetail";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:id" element={<LessonDetail />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exam/:id" element={<ExamDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
