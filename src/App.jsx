import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { EmailGenerator } from './pages/EmailGenerator';
import { MeetingNotes } from './pages/MeetingNotes';
import { TaskPlanner } from './pages/TaskPlanner';
import { ResearchAssistant } from './pages/ResearchAssistant';
import { Chatbot } from './pages/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<EmailGenerator />} />
          <Route path="meeting-notes" element={<MeetingNotes />} />
          <Route path="task-planner" element={<TaskPlanner />} />
          <Route path="research" element={<ResearchAssistant />} />
          <Route path="chat" element={<Chatbot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
