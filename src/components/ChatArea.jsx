import { useState, useRef } from 'react';
import { PaperAirplaneIcon, PhotoIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import Message from './Message';
import useStore from '../store';

export default function ChatArea({ isSidebarOpen }) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef();
  const { addMessage, currentChat, startCall } = useStore();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    await addMessage({
      id: Date.now(),
      text: message,
      timestamp: new Date(),
      sender: 'user',
      recipient: currentChat?.id
    });

    setMessage('');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        await addMessage({
          id: Date.now(),
          text: '',
          timestamp: new Date(),
          sender: 'user',
          recipient: currentChat?.id,
          fileUrl: e.target?.result,
          fileName: file.name,
          fileType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-semibold">
              {currentChat?.name?.[0] || 'A'}
            </span>
          </div>
          <div className="ml-4">
            <h2 className="font-semibold">{currentChat?.name || 'Alice'}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => startCall(currentChat, 'voice')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <PhoneIcon className="h-6 w-6 text-gray-500" />
          </button>
          <button
            onClick={() => startCall(currentChat, 'video')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <VideoCameraIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="flex flex-col space-y-4">
          {/* Messages will be rendered here */}
          <Message
            message={{
              text: "Hey! How are you?",
              timestamp: new Date(),
              reactions: ['👍']
            }}
            isOwn={false}
          />
          <Message
            message={{
              text: "I'm doing great! How about you?",
              timestamp: new Date()
            }}
            isOwn={true}
          />
        </div>
      </div>

      <div className="bg-white p-4 border-t">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <PhotoIcon className="h-6 w-6 text-gray-500" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,video/*,application/*"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-indigo-500"
          />
          <button 
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            onClick={handleSendMessage}
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}