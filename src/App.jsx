import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Stories from './components/Stories';
import CallInterface from './components/CallInterface';
import useStore from './store';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const currentCall = useStore((state) => state.currentCall);

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar isExpanded={isSidebarExpanded} onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} />
      <div className="flex-1 flex flex-col">
        <Stories />
        <ChatArea isSidebarOpen={isSidebarExpanded} />
      </div>
      {currentCall && <CallInterface />}
    </div>
  );
}

export default App;