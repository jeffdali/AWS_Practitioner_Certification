
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LessonDetail from './pages/LessonDetail';
import Feedback from './pages/Feedback';

const App: React.FC = () => {
  return (
    <Router basename="/AWS_Practitioner_Certification/">
      <div className="min-h-screen bg-[#0f172a]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:id" element={<LessonDetail />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
